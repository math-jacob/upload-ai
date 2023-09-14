import { useEffect, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { api } from "@/lib/axios";

type Prompt = {
    id: string,
    title: string,
    template: string,
}

type PromptSelectProps = {
    onPromptSelected: (template: string) => void,
}

export function PromptSelect(props: PromptSelectProps) {

    const [prompts, setPrompts] = useState<Prompt[] | null >(null) //

    // Dispara a função quando a variável que está no parametro mudar
    // Se o array for vazio, useEffect vai ser disparado uma única vez na criação do componente prompt-select em tela
    useEffect(() => {
        api.get('/prompts').then(response => {
            setPrompts(response.data)
        })
    }, [])

    function handlePromptSelected(promptId: string) {
        const selectedPrompt = prompts?.find(prompt => prompt.id === promptId)

        if (!selectedPrompt) {
            return
        }

        props.onPromptSelected(selectedPrompt.template)
    }

    return (
        <Select onValueChange={handlePromptSelected}>
            <SelectTrigger>
                <SelectValue placeholder="Selecione um prompt..."/>
            </SelectTrigger>
            <SelectContent>
                {prompts?.map(prompt => {
                    return (
                        <SelectItem key={prompt.id} value={prompt.id}>
                            {prompt.title}
                        </SelectItem>
                    )
                })}
            </SelectContent>
        </Select>
    )
}