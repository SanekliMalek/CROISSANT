export declare class AssistantDto {
    prompt: string;
    history?: {
        role: 'user' | 'assistant';
        content: string;
    }[];
}
