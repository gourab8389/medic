"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Database, LucideLoader2, MoveUp, RefreshCcw } from "lucide-react";
import { Progress } from "@/components/ui/progress";


const VectorDbPage = () => {
    const [isUploading, setIsUploading] = useState(false);
  return (
    <div className="flex flex-col items-center p-24">
      <Card>
        <CardHeader>
        <CardTitle>
            Update Knowledge Base
        </CardTitle>
        <CardDescription>
            Add new documents to vector DB
        </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2 grid gap-4 border rounded-lg p-6">
                <div className="gap-4 relative">
                    <Button 
                    className="absolute -right-4 -top-4" 
                    variant={"ghost"} 
                    size={"icon"}
                    >
                        <RefreshCcw/>
                    </Button>
                    <label>
                        Files List:
                    </label>
                    <Textarea 
                    readOnly 
                    className="min-h-24 resize-none border p-3 shadow-none disabled:cursor-default focus-visible:ring-0 text-sm text-muted-foreground"
                    />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                        <label>
                            Index name
                        </label>
                        <input 
                        placeholder="index name"
                        disabled={isUploading}
                        className="disabled:cursor-default"
                        />
                        
                    </div>
                    <div className="grid gap-2">
                        <label>
                            Namespace
                        </label>
                        <input 
                        placeholder="namespace"
                        disabled={isUploading}
                        className="disabled:cursor-default"
                        />
                    </div>
                </div>
            </div>
            <Button 
            variant={"outline"} 
            className="w-full h-full" 
            disabled={isUploading}
            >
              <span className="flex flex-row">
                <Database size={50} className="stroke-[#D90013]"/>
                <MoveUp className="stroke-[#D90013]"/>
              </span>
            </Button>
          </div>
          <div className="mt-4">
            <label>File Name:</label>
            <div className="flex flex-row items-center gap-4">
                <Progress value={80}/>
                <LucideLoader2 className="stroke-[#D90013] animate-spin"/>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VectorDbPage;
