import { NextApiRequest, NextApiResponse } from "next";
import { Pinecone } from "@pinecone-database/pinecone";
import { DirectoryLoader } from "langchain/document_loaders/fs/directory";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { TextLoader } from "langchain/document_loaders/fs/text";

import { updateVectorDB } from "@/utils";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if(req.method === "POST"){
        const { indexName, namespace } = JSON.parse(req.body);
        await handleUpload(indexName, namespace, res);
    }
}

async function handleUpload(indexName:string, namespace: string, res: NextApiResponse) {
    const loadrer = new DirectoryLoader('./documents', {
        '.pdf': (path: string) => new PDFLoader(path, {
            splitPages: false
        }),
        '.txt': (path: string) => new TextLoader(path)
    });
    const docs = await loadrer.load();
    const client = new Pinecone({
        apiKey: process.env.PINECONE_API_KEY!
    })
    await updateVectorDB(client, indexName, namespace, docs, (filename, totalChunks, chunksUpserted, isComplete) => {
        if(isComplete){
            JSON.stringify({
                filename,
                totalChunks,
                chunksUpserted,
                isComplete
            })
        }else{
            res.end();
        }
    });
}
