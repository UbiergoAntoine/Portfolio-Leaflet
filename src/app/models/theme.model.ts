
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
import { Post } from './post.model';


export class Theme {

  // name sur le hover de la card
  @serializable id: string;
  @serializable name: string;
  @serializable icon: string;

  constructor(data?) {
    this.setData(data);
  }
  setData(data?: any) {
    if (data) {
      Object.assign(this, data);
    }
  }
}
