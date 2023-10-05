export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Inventory = {
  __typename?: 'Inventory';
  available: Scalars['Int']['output'];
  barcodeNumber?: Maybe<Scalars['Int']['output']>;
  inOpenOrders?: Maybe<Scalars['Int']['output']>;
  minimumLevel: Scalars['Int']['output'];
  purchasePrice?: Maybe<Scalars['Float']['output']>;
  retailPrice?: Maybe<Scalars['Float']['output']>;
  sku: Scalars['String']['output'];
  stockLevel: Scalars['Int']['output'];
  title: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addInventory?: Maybe<Inventory>;
  login?: Maybe<User>;
  register?: Maybe<User>;
  verifyEmail?: Maybe<User>;
};


export type MutationAddInventoryArgs = {
  available: Scalars['Int']['input'];
  barcodeNumber?: InputMaybe<Scalars['Int']['input']>;
  inOpenOrders?: InputMaybe<Scalars['Int']['input']>;
  minimumLevel: Scalars['Int']['input'];
  purchasePrice?: InputMaybe<Scalars['Float']['input']>;
  retailPrice?: InputMaybe<Scalars['Float']['input']>;
  stockLevel: Scalars['Int']['input'];
  title: Scalars['String']['input'];
};


export type MutationLoginArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationRegisterArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationVerifyEmailArgs = {
  code: Scalars['String']['input'];
  email: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  getInventory?: Maybe<Array<Inventory>>;
};

export type User = {
  __typename?: 'User';
  email: Scalars['String']['output'];
  token?: Maybe<Scalars['String']['output']>;
};
