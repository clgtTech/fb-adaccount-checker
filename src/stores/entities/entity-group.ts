import parseJSON from 'date-fns/parseJSON';

export class EntityGroup {
  id: string;
  name: string;
  color: string;
  createdAt: Date;

  constructor(entityGroupDTO: EntityGroupDTO) {
    this.id = entityGroupDTO.id;
    this.name = entityGroupDTO.name;
    this.color = entityGroupDTO.color;
    this.createdAt = parseJSON(entityGroupDTO.createdAt);
  }

  static Colors = [
    '#71717a',
    '#60a5fa',
    '#3bc9db',
    '#ff6b6b',
    '#5ec169',
    '#94d82d',
    '#748ffc',
    '#fcc419',
    '#ff922b',
  ];
}

export interface EntityGroupDTO {
  id: string;
  name: string;
  color: string;
  createdAt: Date | string | number;
}

export interface EntityGroupParams {
  name: EntityGroup['name'];
  color: EntityGroup['color'];
}
