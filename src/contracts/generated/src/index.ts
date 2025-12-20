import { Buffer } from "buffer";
import { Address } from "@stellar/stellar-sdk";
import {
  AssembledTransaction,
  Client as ContractClient,
  ClientOptions as ContractClientOptions,
  MethodOptions,
  Result,
  Spec as ContractSpec,
} from "@stellar/stellar-sdk/contract";
import type {
  u32,
  i32,
  u64,
  i64,
  u128,
  i128,
  u256,
  i256,
  Option,
  Timepoint,
  Duration,
} from "@stellar/stellar-sdk/contract";
export * from "@stellar/stellar-sdk";
export * as contract from "@stellar/stellar-sdk/contract";
export * as rpc from "@stellar/stellar-sdk/rpc";

if (typeof window !== "undefined") {
  //@ts-ignore Buffer exists
  window.Buffer = window.Buffer || Buffer;
}


export const networks = {
  testnet: {
    networkPassphrase: "Test SDF Network ; September 2015",
    contractId: "CCOP5F4RHCYCUKPS34FBZR5FNCMVYGXELICHYLTHKN5RQEMU2G7ER66H",
  }
} as const

export type EscrowStatus = {tag: "Pending", values: void} | {tag: "InProgress", values: void} | {tag: "Released", values: void} | {tag: "Refunded", values: void} | {tag: "Disputed", values: void} | {tag: "Expired", values: void};

export type MilestoneStatus = {tag: "NotStarted", values: void} | {tag: "Submitted", values: void} | {tag: "Approved", values: void} | {tag: "Disputed", values: void} | {tag: "Resolved", values: void} | {tag: "Rejected", values: void};


export interface Milestone {
  amount: i128;
  approved_at: u32;
  description: string;
  dispute_reason: Option<string>;
  disputed_at: u32;
  disputed_by: Option<string>;
  rejection_reason: Option<string>;
  status: MilestoneStatus;
  submitted_at: u32;
}


export interface Application {
  applied_at: u32;
  cover_letter: string;
  freelancer: string;
  proposed_timeline: u32;
}


export interface Rating {
  client: string;
  escrow_id: u32;
  freelancer: string;
  rated_at: u32;
  rating: u32;
  review: string;
}

export type Badge = {tag: "Beginner", values: void} | {tag: "Intermediate", values: void} | {tag: "Advanced", values: void} | {tag: "Expert", values: void};


export interface EscrowData {
  arbiters: Array<string>;
  beneficiary: Option<string>;
  created_at: u32;
  deadline: u32;
  depositor: string;
  is_open_job: boolean;
  milestone_count: u32;
  paid_amount: i128;
  platform_fee: i128;
  project_description: string;
  project_title: string;
  required_confirmations: u32;
  status: EscrowStatus;
  token: Option<string>;
  total_amount: i128;
  work_started: boolean;
}

export type DataKey = {tag: "Escrow", values: readonly [u32]} | {tag: "Milestone", values: readonly [u32, u32]} | {tag: "Application", values: readonly [u32, u32]} | {tag: "UserEscrows", values: readonly [string]} | {tag: "AuthorizedArbiter", values: readonly [string]} | {tag: "WhitelistedToken", values: readonly [string]} | {tag: "EscrowedAmount", values: readonly [string]} | {tag: "TotalFeesByToken", values: readonly [string]} | {tag: "Reputation", values: readonly [string]} | {tag: "CompletedEscrows", values: readonly [string]} | {tag: "Rating", values: readonly [u32]} | {tag: "FreelancerRating", values: readonly [string]} | {tag: "AverageRating", values: readonly [string]} | {tag: "NextEscrowId", values: void} | {tag: "PlatformFeeBP", values: void} | {tag: "FeeCollector", values: void} | {tag: "Owner", values: void} | {tag: "JobCreationPaused", values: void};

export interface Client {
  /**
   * Construct and simulate a initialize transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   * Initialize the contract
   */
  initialize: ({owner, fee_collector, platform_fee_bp}: {owner: string, fee_collector: string, platform_fee_bp: u32}, options?: MethodOptions) => Promise<AssembledTransaction<Result<void>>>

  /**
   * Construct and simulate a create_escrow transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   * Create an escrow with token
   * Note: Milestone amounts and descriptions are combined into tuples to reduce parameter count
   */
  create_escrow: ({depositor, beneficiary, arbiters, required_confirmations, milestones, token, total_amount, duration, project_title, project_description}: {depositor: string, beneficiary: Option<string>, arbiters: Array<string>, required_confirmations: u32, milestones: Array<readonly [i128, string]>, token: Option<string>, total_amount: i128, duration: u32, project_title: string, project_description: string}, options?: MethodOptions) => Promise<AssembledTransaction<Result<u32>>>

  /**
   * Construct and simulate a start_work transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   * Start work on an escrow
   */
  start_work: ({escrow_id, beneficiary}: {escrow_id: u32, beneficiary: string}, options?: MethodOptions) => Promise<AssembledTransaction<Result<void>>>

  /**
   * Construct and simulate a submit_milestone transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   * Submit a milestone
   */
  submit_milestone: ({escrow_id, milestone_index, description, beneficiary}: {escrow_id: u32, milestone_index: u32, description: string, beneficiary: string}, options?: MethodOptions) => Promise<AssembledTransaction<Result<void>>>

  /**
   * Construct and simulate a resubmit_milestone transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   * Resubmit a rejected milestone
   */
  resubmit_milestone: ({escrow_id, milestone_index, description, beneficiary}: {escrow_id: u32, milestone_index: u32, description: string, beneficiary: string}, options?: MethodOptions) => Promise<AssembledTransaction<Result<void>>>

  /**
   * Construct and simulate a approve_milestone transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   * Approve a milestone
   */
  approve_milestone: ({escrow_id, milestone_index, depositor}: {escrow_id: u32, milestone_index: u32, depositor: string}, options?: MethodOptions) => Promise<AssembledTransaction<Result<void>>>

  /**
   * Construct and simulate a reject_milestone transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   * Reject a milestone
   */
  reject_milestone: ({escrow_id, milestone_index, reason, depositor}: {escrow_id: u32, milestone_index: u32, reason: string, depositor: string}, options?: MethodOptions) => Promise<AssembledTransaction<Result<void>>>

  /**
   * Construct and simulate a dispute_milestone transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   * Dispute a milestone
   */
  dispute_milestone: ({escrow_id, milestone_index, reason, disputer}: {escrow_id: u32, milestone_index: u32, reason: string, disputer: string}, options?: MethodOptions) => Promise<AssembledTransaction<Result<void>>>

  /**
   * Construct and simulate a apply_to_job transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   * Apply to a job
   */
  apply_to_job: ({escrow_id, cover_letter, proposed_timeline, freelancer}: {escrow_id: u32, cover_letter: string, proposed_timeline: u32, freelancer: string}, options?: MethodOptions) => Promise<AssembledTransaction<Result<void>>>

  /**
   * Construct and simulate a accept_freelancer transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   * Accept a freelancer for an open job
   */
  accept_freelancer: ({escrow_id, freelancer, depositor}: {escrow_id: u32, freelancer: string, depositor: string}, options?: MethodOptions) => Promise<AssembledTransaction<Result<void>>>

  /**
   * Construct and simulate a refund_escrow transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   * Refund an escrow
   */
  refund_escrow: ({escrow_id, depositor}: {escrow_id: u32, depositor: string}, options?: MethodOptions) => Promise<AssembledTransaction<Result<void>>>

  /**
   * Construct and simulate a emergency_refund_after_deadline transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   * Emergency refund after deadline
   */
  emergency_refund_after_deadline: ({escrow_id, depositor}: {escrow_id: u32, depositor: string}, options?: MethodOptions) => Promise<AssembledTransaction<Result<void>>>

  /**
   * Construct and simulate a extend_deadline transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   * Extend deadline
   */
  extend_deadline: ({escrow_id, extra_seconds, depositor}: {escrow_id: u32, extra_seconds: u32, depositor: string}, options?: MethodOptions) => Promise<AssembledTransaction<Result<void>>>

  /**
   * Construct and simulate a get_escrow transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  get_escrow: ({escrow_id}: {escrow_id: u32}, options?: MethodOptions) => Promise<AssembledTransaction<Option<EscrowData>>>

  /**
   * Construct and simulate a get_user_escrows transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  get_user_escrows: ({user}: {user: string}, options?: MethodOptions) => Promise<AssembledTransaction<Array<u32>>>

  /**
   * Construct and simulate a get_reputation transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  get_reputation: ({user}: {user: string}, options?: MethodOptions) => Promise<AssembledTransaction<u32>>

  /**
   * Construct and simulate a set_platform_fee_bp transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  set_platform_fee_bp: ({fee_bp}: {fee_bp: u32}, options?: MethodOptions) => Promise<AssembledTransaction<Result<void>>>

  /**
   * Construct and simulate a set_fee_collector transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  set_fee_collector: ({fee_collector}: {fee_collector: string}, options?: MethodOptions) => Promise<AssembledTransaction<Result<void>>>

  /**
   * Construct and simulate a set_owner transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  set_owner: ({new_owner}: {new_owner: string}, options?: MethodOptions) => Promise<AssembledTransaction<Result<void>>>

  /**
   * Construct and simulate a whitelist_token transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  whitelist_token: ({token}: {token: string}, options?: MethodOptions) => Promise<AssembledTransaction<Result<void>>>

  /**
   * Construct and simulate a authorize_arbiter transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  authorize_arbiter: ({arbiter}: {arbiter: string}, options?: MethodOptions) => Promise<AssembledTransaction<Result<void>>>

  /**
   * Construct and simulate a pause_job_creation transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   * Pause job creation
   */
  pause_job_creation: (options?: MethodOptions) => Promise<AssembledTransaction<Result<void>>>

  /**
   * Construct and simulate a unpause_job_creation transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   * Unpause job creation
   */
  unpause_job_creation: (options?: MethodOptions) => Promise<AssembledTransaction<Result<void>>>

  /**
   * Construct and simulate a is_job_creation_paused transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   * Check if job creation is paused
   */
  is_job_creation_paused: (options?: MethodOptions) => Promise<AssembledTransaction<boolean>>

  /**
   * Construct and simulate a get_owner transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   * Get the contract owner
   */
  get_owner: (options?: MethodOptions) => Promise<AssembledTransaction<Result<string>>>

  /**
   * Construct and simulate a has_applied transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   * Check if a freelancer has applied to a job
   */
  has_applied: ({escrow_id, freelancer}: {escrow_id: u32, freelancer: string}, options?: MethodOptions) => Promise<AssembledTransaction<boolean>>

  /**
   * Construct and simulate a get_application transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   * Get an application by escrow_id and freelancer
   */
  get_application: ({escrow_id, freelancer}: {escrow_id: u32, freelancer: string}, options?: MethodOptions) => Promise<AssembledTransaction<Option<Application>>>

  /**
   * Construct and simulate a get_applications transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   * Get all applications for an escrow
   */
  get_applications: ({escrow_id}: {escrow_id: u32}, options?: MethodOptions) => Promise<AssembledTransaction<Array<Application>>>

  /**
   * Construct and simulate a get_milestone transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   * Get a milestone by escrow_id and milestone_index
   */
  get_milestone: ({escrow_id, milestone_index}: {escrow_id: u32, milestone_index: u32}, options?: MethodOptions) => Promise<AssembledTransaction<Option<Milestone>>>

  /**
   * Construct and simulate a get_milestones transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   * Get all milestones for an escrow
   */
  get_milestones: ({escrow_id}: {escrow_id: u32}, options?: MethodOptions) => Promise<AssembledTransaction<Array<Milestone>>>

  /**
   * Construct and simulate a submit_rating transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   * Submit a rating for a completed escrow
   */
  submit_rating: ({escrow_id, rating, review, client}: {escrow_id: u32, rating: u32, review: string, client: string}, options?: MethodOptions) => Promise<AssembledTransaction<Result<void>>>

  /**
   * Construct and simulate a get_rating transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   * Get rating for an escrow
   */
  get_rating: ({escrow_id}: {escrow_id: u32}, options?: MethodOptions) => Promise<AssembledTransaction<Option<Rating>>>

  /**
   * Construct and simulate a get_average_rating transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   * Get average rating for a freelancer (returns (total_rating, count))
   */
  get_average_rating: ({freelancer}: {freelancer: string}, options?: MethodOptions) => Promise<AssembledTransaction<readonly [u32, u32]>>

  /**
   * Construct and simulate a get_badge transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   * Get badge for a freelancer
   */
  get_badge: ({freelancer}: {freelancer: string}, options?: MethodOptions) => Promise<AssembledTransaction<Badge>>

  /**
   * Construct and simulate a get_completed_escrows transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   * Get completed escrows count for a user
   */
  get_completed_escrows: ({user}: {user: string}, options?: MethodOptions) => Promise<AssembledTransaction<u32>>

  /**
   * Construct and simulate a is_authorized_arbiter transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   * Check if an address is an authorized arbiter
   */
  is_authorized_arbiter: ({arbiter}: {arbiter: string}, options?: MethodOptions) => Promise<AssembledTransaction<boolean>>

}
export class Client extends ContractClient {
  static async deploy<T = Client>(
    /** Options for initializing a Client as well as for calling a method, with extras specific to deploying. */
    options: MethodOptions &
      Omit<ContractClientOptions, "contractId"> & {
        /** The hash of the Wasm blob, which must already be installed on-chain. */
        wasmHash: Buffer | string;
        /** Salt used to generate the contract's ID. Passed through to {@link Operation.createCustomContract}. Default: random. */
        salt?: Buffer | Uint8Array;
        /** The format used to decode `wasmHash`, if it's provided as a string. */
        format?: "hex" | "base64";
      }
  ): Promise<AssembledTransaction<T>> {
    return ContractClient.deploy(null, options)
  }
  constructor(public readonly options: ContractClientOptions) {
    super(
      new ContractSpec([ "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",
        "AAAAAAAAABBSZWZ1bmQgYW4gZXNjcm93AAAADXJlZnVuZF9lc2Nyb3cAAAAAAAACAAAAAAAAAAllc2Nyb3dfaWQAAAAAAAAEAAAAAAAAAAlkZXBvc2l0b3IAAAAAAAATAAAAAQAAA+kAAAPtAAAAAAAAAAM=",
        "AAAAAAAAAB9FbWVyZ2VuY3kgcmVmdW5kIGFmdGVyIGRlYWRsaW5lAAAAAB9lbWVyZ2VuY3lfcmVmdW5kX2FmdGVyX2RlYWRsaW5lAAAAAAIAAAAAAAAACWVzY3Jvd19pZAAAAAAAAAQAAAAAAAAACWRlcG9zaXRvcgAAAAAAABMAAAABAAAD6QAAA+0AAAAAAAAAAw==",
        "AAAAAAAAAA9FeHRlbmQgZGVhZGxpbmUAAAAAD2V4dGVuZF9kZWFkbGluZQAAAAADAAAAAAAAAAllc2Nyb3dfaWQAAAAAAAAEAAAAAAAAAA1leHRyYV9zZWNvbmRzAAAAAAAABAAAAAAAAAAJZGVwb3NpdG9yAAAAAAAAEwAAAAEAAAPpAAAD7QAAAAAAAAAD",
        "AAAAAAAAAAAAAAAKZ2V0X2VzY3JvdwAAAAAAAQAAAAAAAAAJZXNjcm93X2lkAAAAAAAABAAAAAEAAAPoAAAH0AAAAApFc2Nyb3dEYXRhAAA=",
        "AAAAAAAAAAAAAAAQZ2V0X3VzZXJfZXNjcm93cwAAAAEAAAAAAAAABHVzZXIAAAATAAAAAQAAA+oAAAAE",
        "AAAAAAAAAAAAAAAOZ2V0X3JlcHV0YXRpb24AAAAAAAEAAAAAAAAABHVzZXIAAAATAAAAAQAAAAQ=",
        "AAAAAAAAAAAAAAATc2V0X3BsYXRmb3JtX2ZlZV9icAAAAAABAAAAAAAAAAZmZWVfYnAAAAAAAAQAAAABAAAD6QAAA+0AAAAAAAAAAw==",
        "AAAAAAAAAAAAAAARc2V0X2ZlZV9jb2xsZWN0b3IAAAAAAAABAAAAAAAAAA1mZWVfY29sbGVjdG9yAAAAAAAAEwAAAAEAAAPpAAAD7QAAAAAAAAAD",
        "AAAAAAAAAAAAAAAJc2V0X293bmVyAAAAAAAAAQAAAAAAAAAJbmV3X293bmVyAAAAAAAAEwAAAAEAAAPpAAAD7QAAAAAAAAAD",
        "AAAAAAAAAAAAAAAPd2hpdGVsaXN0X3Rva2VuAAAAAAEAAAAAAAAABXRva2VuAAAAAAAAEwAAAAEAAAPpAAAD7QAAAAAAAAAD",
        "AAAAAAAAAAAAAAARYXV0aG9yaXplX2FyYml0ZXIAAAAAAAABAAAAAAAAAAdhcmJpdGVyAAAAABMAAAABAAAD6QAAA+0AAAAAAAAAAw==",
        "AAAAAAAAABJQYXVzZSBqb2IgY3JlYXRpb24AAAAAABJwYXVzZV9qb2JfY3JlYXRpb24AAAAAAAAAAAABAAAD6QAAA+0AAAAAAAAAAw==",
        "AAAAAAAAABRVbnBhdXNlIGpvYiBjcmVhdGlvbgAAABR1bnBhdXNlX2pvYl9jcmVhdGlvbgAAAAAAAAABAAAD6QAAA+0AAAAAAAAAAw==",
        "AAAAAAAAAB9DaGVjayBpZiBqb2IgY3JlYXRpb24gaXMgcGF1c2VkAAAAABZpc19qb2JfY3JlYXRpb25fcGF1c2VkAAAAAAAAAAAAAQAAAAE=",
        "AAAAAAAAABZHZXQgdGhlIGNvbnRyYWN0IG93bmVyAAAAAAAJZ2V0X293bmVyAAAAAAAAAAAAAAEAAAPpAAAAEwAAAAM=",
        "AAAAAAAAACpDaGVjayBpZiBhIGZyZWVsYW5jZXIgaGFzIGFwcGxpZWQgdG8gYSBqb2IAAAAAAAtoYXNfYXBwbGllZAAAAAACAAAAAAAAAAllc2Nyb3dfaWQAAAAAAAAEAAAAAAAAAApmcmVlbGFuY2VyAAAAAAATAAAAAQAAAAE=",
        "AAAAAAAAAC5HZXQgYW4gYXBwbGljYXRpb24gYnkgZXNjcm93X2lkIGFuZCBmcmVlbGFuY2VyAAAAAAAPZ2V0X2FwcGxpY2F0aW9uAAAAAAIAAAAAAAAACWVzY3Jvd19pZAAAAAAAAAQAAAAAAAAACmZyZWVsYW5jZXIAAAAAABMAAAABAAAD6AAAB9AAAAALQXBwbGljYXRpb24A",
        "AAAAAAAAACJHZXQgYWxsIGFwcGxpY2F0aW9ucyBmb3IgYW4gZXNjcm93AAAAAAAQZ2V0X2FwcGxpY2F0aW9ucwAAAAEAAAAAAAAACWVzY3Jvd19pZAAAAAAAAAQAAAABAAAD6gAAB9AAAAALQXBwbGljYXRpb24A",
        "AAAAAAAAADBHZXQgYSBtaWxlc3RvbmUgYnkgZXNjcm93X2lkIGFuZCBtaWxlc3RvbmVfaW5kZXgAAAANZ2V0X21pbGVzdG9uZQAAAAAAAAIAAAAAAAAACWVzY3Jvd19pZAAAAAAAAAQAAAAAAAAAD21pbGVzdG9uZV9pbmRleAAAAAAEAAAAAQAAA+gAAAfQAAAACU1pbGVzdG9uZQAAAA==",
        "AAAAAAAAACBHZXQgYWxsIG1pbGVzdG9uZXMgZm9yIGFuIGVzY3JvdwAAAA5nZXRfbWlsZXN0b25lcwAAAAAAAQAAAAAAAAAJZXNjcm93X2lkAAAAAAAABAAAAAEAAAPqAAAH0AAAAAlNaWxlc3RvbmUAAAA=",
        "AAAAAAAAACZTdWJtaXQgYSByYXRpbmcgZm9yIGEgY29tcGxldGVkIGVzY3JvdwAAAAAADXN1Ym1pdF9yYXRpbmcAAAAAAAAEAAAAAAAAAAllc2Nyb3dfaWQAAAAAAAAEAAAAAAAAAAZyYXRpbmcAAAAAAAQAAAAAAAAABnJldmlldwAAAAAAEAAAAAAAAAAGY2xpZW50AAAAAAATAAAAAQAAA+kAAAPtAAAAAAAAAAM=",
        "AAAAAAAAABhHZXQgcmF0aW5nIGZvciBhbiBlc2Nyb3cAAAAKZ2V0X3JhdGluZwAAAAAAAQAAAAAAAAAJZXNjcm93X2lkAAAAAAAABAAAAAEAAAPoAAAH0AAAAAZSYXRpbmcAAA==",
        "AAAAAAAAAENHZXQgYXZlcmFnZSByYXRpbmcgZm9yIGEgZnJlZWxhbmNlciAocmV0dXJucyAodG90YWxfcmF0aW5nLCBjb3VudCkpAAAAABJnZXRfYXZlcmFnZV9yYXRpbmcAAAAAAAEAAAAAAAAACmZyZWVsYW5jZXIAAAAAABMAAAABAAAD7QAAAAIAAAAEAAAABA==",
        "AAAAAAAAABpHZXQgYmFkZ2UgZm9yIGEgZnJlZWxhbmNlcgAAAAAACWdldF9iYWRnZQAAAAAAAAEAAAAAAAAACmZyZWVsYW5jZXIAAAAAABMAAAABAAAH0AAAAAVCYWRnZQAAAA==",
        "AAAAAAAAACZHZXQgY29tcGxldGVkIGVzY3Jvd3MgY291bnQgZm9yIGEgdXNlcgAAAAAAFWdldF9jb21wbGV0ZWRfZXNjcm93cwAAAAAAAAEAAAAAAAAABHVzZXIAAAATAAAAAQAAAAQ=",
        "AAAAAAAAACxDaGVjayBpZiBhbiBhZGRyZXNzIGlzIGFuIGF1dGhvcml6ZWQgYXJiaXRlcgAAABVpc19hdXRob3JpemVkX2FyYml0ZXIAAAAAAAABAAAAAAAAAAdhcmJpdGVyAAAAABMAAAABAAAAAQ==" ]),
      options
    )
  }
  public readonly fromJSON = {
    initialize: this.txFromJSON<Result<void>>,
        create_escrow: this.txFromJSON<Result<u32>>,
        start_work: this.txFromJSON<Result<void>>,
        submit_milestone: this.txFromJSON<Result<void>>,
        resubmit_milestone: this.txFromJSON<Result<void>>,
        approve_milestone: this.txFromJSON<Result<void>>,
        reject_milestone: this.txFromJSON<Result<void>>,
        dispute_milestone: this.txFromJSON<Result<void>>,
        apply_to_job: this.txFromJSON<Result<void>>,
        accept_freelancer: this.txFromJSON<Result<void>>,
        refund_escrow: this.txFromJSON<Result<void>>,
        emergency_refund_after_deadline: this.txFromJSON<Result<void>>,
        extend_deadline: this.txFromJSON<Result<void>>,
        get_escrow: this.txFromJSON<Option<EscrowData>>,
        get_user_escrows: this.txFromJSON<Array<u32>>,
        get_reputation: this.txFromJSON<u32>,
        set_platform_fee_bp: this.txFromJSON<Result<void>>,
        set_fee_collector: this.txFromJSON<Result<void>>,
        set_owner: this.txFromJSON<Result<void>>,
        whitelist_token: this.txFromJSON<Result<void>>,
        authorize_arbiter: this.txFromJSON<Result<void>>,
        pause_job_creation: this.txFromJSON<Result<void>>,
        unpause_job_creation: this.txFromJSON<Result<void>>,
        is_job_creation_paused: this.txFromJSON<boolean>,
        get_owner: this.txFromJSON<Result<string>>,
        has_applied: this.txFromJSON<boolean>,
        get_application: this.txFromJSON<Option<Application>>,
        get_applications: this.txFromJSON<Array<Application>>,
        get_milestone: this.txFromJSON<Option<Milestone>>,
        get_milestones: this.txFromJSON<Array<Milestone>>,
        submit_rating: this.txFromJSON<Result<void>>,
        get_rating: this.txFromJSON<Option<Rating>>,
        get_average_rating: this.txFromJSON<readonly [u32, u32]>,
        get_badge: this.txFromJSON<Badge>,
        get_completed_escrows: this.txFromJSON<u32>,
        is_authorized_arbiter: this.txFromJSON<boolean>
  }
}