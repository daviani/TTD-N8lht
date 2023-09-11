import { ReactNode } from 'react'

export type RootStackParamList = {
    Home: undefined;
    Clients: undefined;
    ClientDetails: {
        slug: string;
    }
    CheckAccount: {
        slug: string;
    }
};

export type PageContainerProps = {
    children: ReactNode;
};

interface Operation {
    uuid: string;
    operation: number;
    date: string;
    wording: string;
    amount: number;
}

interface Balance {
    uuid: string;
    date: string;
    balance: number;
}

export interface ClientDetails {
    success: boolean;
    message: string;
    data: {
        uuid: string;
        clientId: string,
        operation: string;
        operations: Operation[];
        balances: Balance[];
    };
}

export interface Duplicate {
    original: Operation;
    duplicate: Operation;
}

export interface CheckAccount {
    success: boolean;
    message: string;
    data: {
        balance: number;
        isNegativeBalance: boolean;
        duplicateVerification: {
            duplicates: {
                operation: Duplicate[];
                wording: Duplicate[];
                amount: Duplicate[];
            };
        };
        message: string;
        reasons: string;
    };
}
