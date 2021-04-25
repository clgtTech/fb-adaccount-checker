export class DeliveryStatus {
  readonly status: string;
  readonly substatus?: string;

  constructor(deliveryStatusDTO: DeliveryStatusDTO) {
    this.status = deliveryStatusDTO.status;
    this.substatus = deliveryStatusDTO.substatus;
  }
}

export interface DeliveryStatusDTO {
  status: string;
  substatus?: string;
}
