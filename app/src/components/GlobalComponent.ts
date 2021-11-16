import { BaseComponent, Component, Global } from '@jovotech/framework';
import { OpenDocumentationComponent } from './OpenDocumentationComponent';

@Global()
@Component()
export class GlobalComponent extends BaseComponent {
  LAUNCH() {
    return this.$redirect(OpenDocumentationComponent);
  }

  UNHANDLED() {
    return this.LAUNCH();
  }
}
