import { Document } from 'mongoose'

declare namespace NodeJS {
    interface ProcessEnv {
        PORT: string;
        MONGODB_USER: string;
        MONGODB_PASSWORD: string;
        DB_NAME: string;
        DB_CLUSTER: string;
    }
}

export interface Operation {
    uuid: string
    operation: number;
    date: Date;
    wording: string;
    amount: number;
}

export interface Balance {
    uuid: string
    date: Date;
    balance: number;
}

export interface ClientDocument extends Document {
    uuid: string
    clientId: string;
    operations: Operation[];
    balances: Balance[];
}

interface DuplicateVerificationResult {
    duplicates: {
        operation: {
            original: Operation
            duplicate: Operation
        }[];
        wording: {
            original: Operation
            duplicate: Operation
        }[];
        amount: {
            original: Operation
            duplicate: Operation
        }[];
    };
}

export interface ValidationResults {
    uuid: string
    balance: number;
    isNegativeBalance: boolean;
    duplicateVerification: DuplicateVerificationResult
    message?: string;
    raison?: string;
}
