import Model from "../models";
import { BaseRepository } from ".";
import { InputPaymentsInterface, PaymentsInterface } from "../interfaces";

export class PaymentRepository extends BaseRepository<
  InputPaymentsInterface,
  PaymentsInterface
> {
  constructor() {
    super(Model.Payment);
  }
}
