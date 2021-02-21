
import { observable } from 'mobx-angular';
import {
  createModelSchema,
  primitive,
  reference,
  list,
  object,
  identifier,
  serialize,
  deserialize,
  getDefaultModelSchema,
  serializable,
} from 'serializr';


export class Todo {

  @serializable id: string;
  @serializable todo: string;
  @serializable @observable done: boolean;

  constructor(data?) {
    this.setData(data);
  }

  setData(data?: any) {
    if (data) {
      Object.assign(this, data);
    }
  }
}