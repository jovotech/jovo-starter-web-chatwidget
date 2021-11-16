import { BaseComponent, Component, Intents } from '@jovotech/framework';
import { OpenDocumentationOutput } from '../output/OpenDocumentationOutput';

@Component()
export class OpenDocumentationComponent extends BaseComponent {
  START() {
    return this.$send(OpenDocumentationOutput);
  }

  @Intents(['YesIntent'])
  openDocumentation() {
    return this.$send({
      message: 'Great! Opening now...',
      listen: false,
      platforms: {
        core: {
          // custom property used for this example
          redirectTo: 'https://v4.jovo.tech/docs',
        },
      },
    });
  }

  UNHANDLED() {
    return this.$send({
      message: 'Alright!',
      listen: false,
    });
  }
}
