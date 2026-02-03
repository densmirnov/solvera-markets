import { Injectable } from "@nestjs/common";
import { Interface } from "ethers";

const INTENT_MARKETPLACE_ABI = [
  "function createIntent(address tokenOut,uint256 minAmountOut,address rewardToken,uint256 rewardAmount,address payer,address initiator,address verifier,uint64 ttlSubmit,uint64 ttlAccept) returns (bytes32)",
  "function submitOffer(bytes32 id,uint256 amountOut)",
  "function selectWinner(bytes32 id,address solver,uint256 amountOut)",
  "function fulfill(bytes32 id)",
  "function expire(bytes32 id)"
];

const iface = new Interface(INTENT_MARKETPLACE_ABI);

export interface TxPayload {
  to: string;
  calldata: string;
  value: string;
}

@Injectable()
export class TxBuilderService {
  private contractAddress: string;

  constructor() {
    this.contractAddress = process.env.CONTRACT_ADDRESS || "";
    if (!this.contractAddress) {
      throw new Error("CONTRACT_ADDRESS is required for tx builders");
    }
  }

  buildCreateIntent(input: {
    tokenOut: string;
    minAmountOut: string;
    rewardToken: string;
    rewardAmount: string;
    payer: string;
    initiator: string;
    verifier: string;
    ttlSubmit: number;
    ttlAccept: number;
  }): TxPayload {
    const calldata = iface.encodeFunctionData("createIntent", [
      input.tokenOut,
      input.minAmountOut,
      input.rewardToken,
      input.rewardAmount,
      input.payer,
      input.initiator,
      input.verifier,
      input.ttlSubmit,
      input.ttlAccept
    ]);

    return { to: this.contractAddress, calldata, value: "0" };
  }

  buildSubmitOffer(id: string, amountOut: string): TxPayload {
    const calldata = iface.encodeFunctionData("submitOffer", [id, amountOut]);
    return { to: this.contractAddress, calldata, value: "0" };
  }

  buildSelectWinner(id: string, solver: string, amountOut: string): TxPayload {
    const calldata = iface.encodeFunctionData("selectWinner", [id, solver, amountOut]);
    return { to: this.contractAddress, calldata, value: "0" };
  }

  buildFulfill(id: string): TxPayload {
    const calldata = iface.encodeFunctionData("fulfill", [id]);
    return { to: this.contractAddress, calldata, value: "0" };
  }

  buildExpire(id: string): TxPayload {
    const calldata = iface.encodeFunctionData("expire", [id]);
    return { to: this.contractAddress, calldata, value: "0" };
  }
}
