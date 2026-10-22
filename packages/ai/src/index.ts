// AI Service Layer for EduSure
// Modular provider interface for AI capabilities

export interface AIProvider {
  name: string;
  generateText(prompt: string, options?: GenerateOptions): Promise<string>;
  generateEmbedding(text: string): Promise<number[]>;
}

export interface GenerateOptions {
  maxTokens?: number;
  temperature?: number;
  systemPrompt?: string;
}

// OpenAI Provider
class OpenAIProvider implements AIProvider {
  name = 'openai';
  private apiKey: string;
  private model: string;

  constructor(apiKey: string, model: string = 'gpt-4o-mini') {
    this.apiKey = apiKey;
    this.model = model;
  }

  async generateText(prompt: string, options: GenerateOptions = {}): Promise<string> {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: this.model,
        messages: [
          ...(options.systemPrompt ? [{ role: 'system', content: options.systemPrompt }] : []),
          { role: 'user', content: prompt },
        ],
        max_tokens: options.maxTokens || 1000,
        temperature: options.temperature || 0.7,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
  }

  async generateEmbedding(text: string): Promise<number[]> {
    const response = await fetch('https://api.openai.com/v1/embeddings', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'text-embedding-3-small',
        input: text,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI Embeddings API error: ${response.status}`);
    }

    const data = await response.json();
    return data.data[0].embedding;
  }
}

// AI Service Manager
class AIService {
  private providers: Map<string, AIProvider> = new Map();
  private defaultProvider: string = 'openai';

  registerProvider(provider: AIProvider) {
    this.providers.set(provider.name, provider);
  }

  setDefaultProvider(name: string) {
    if (!this.providers.has(name)) {
      throw new Error(`Provider ${name} not registered`);
    }
    this.defaultProvider = name;
  }

  getProvider(name?: string): AIProvider {
    const providerName = name || this.defaultProvider;
    const provider = this.providers.get(providerName);
    if (!provider) {
      throw new Error(`AI provider ${providerName} not available`);
    }
    return provider;
  }

  async generateText(prompt: string, options: GenerateOptions = {}, provider?: string): Promise<string> {
    const aiProvider = this.getProvider(provider);
    return aiProvider.generateText(prompt, options);
  }

  async generateEmbedding(text: string, provider?: string): Promise<number[]> {
    const aiProvider = this.getProvider(provider);
    return aiProvider.generateEmbedding(text);
  }

  async generateTutorResponse(
    question: string,
    courseMaterial: string[],
    options: GenerateOptions = {}
  ): Promise<string> {
    const systemPrompt = `You are an AI tutor. Answer questions based on the provided course material. 
    Be helpful, explain concepts clearly, and encourage learning. Do not give direct answers to active assessments.`;
    
    const context = courseMaterial.join('\n\n---\n\n');
    const prompt = `Course Material:\n${context}\n\nQuestion: ${question}`;
    
    return this.generateText(prompt, { ...options, systemPrompt });
  }

  async generateLessonPlan(
    objectives: string[],
    grade: string,
    subject: string,
    duration: number
  ): Promise<string> {
    const systemPrompt = 'You are an expert educator. Generate comprehensive lesson plans.';
    const prompt = `Create a ${duration}-minute lesson plan for ${grade} level ${subject} with the following objectives: ${objectives.join(', ')}`;
    
    return this.generateText(prompt, { systemPrompt });
  }

  async generateQuizQuestions(
    chapterContent: string,
    count: number = 10,
    difficulty: string = 'medium'
  ): Promise<string> {
    const systemPrompt = 'You are an assessment expert. Generate quiz questions.';
    const prompt = `Generate ${count} ${difficulty} difficulty quiz questions based on: ${chapterContent}`;
    
    return this.generateText(prompt, { systemPrompt });
  }

  async summarizeDocument(content: string): Promise<string> {
    const systemPrompt = 'Summarize the following document concisely, capturing key points.';
    return this.generateText(content, { systemPrompt });
  }

  async generateFlashcards(content: string): Promise<string> {
    const systemPrompt = 'Generate flashcards from the content. Format as Q&A pairs.';
    return this.generateText(content, { systemPrompt });
  }
}

// Singleton instance
export const aiService = new AIService();

// Initialize with available providers
if (process.env.OPENAI_API_KEY) {
  aiService.registerProvider(new OpenAIProvider(process.env.OPENAI_API_KEY));
}

export default aiService;