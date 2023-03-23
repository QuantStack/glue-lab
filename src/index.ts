import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';
import { ITranslator } from '@jupyterlab/translation';
import { IMainMenu } from '@jupyterlab/mainmenu';
import { GlueSessionModelFactory } from './document/modelFactory';
import { GlueCanvasWidgetFactory } from './document/widgetFactory';
/**
 * Initialization data for the glue-lab extension.
 */
const gluePlugin: JupyterFrontEndPlugin<void> = {
  id: 'glue-lab:plugin',
  autoStart: true,
  requires: [IMainMenu, ITranslator],
  activate: (
    app: JupyterFrontEnd,
    mainMenu: IMainMenu,
    translator: ITranslator
  ) => {
    const widgetFactory = new GlueCanvasWidgetFactory({
      name: 'Glue Lab',
      modelName: 'gluelab-session-model',
      fileTypes: ['glu'],
      defaultFor: ['glu'],
      commands: app.commands
    });

    app.docRegistry.addWidgetFactory(widgetFactory);

    const modelFactory = new GlueSessionModelFactory();
    app.docRegistry.addModelFactory(modelFactory);
    // register the filetype
    app.docRegistry.addFileType({
      name: 'glu',
      displayName: 'GLU',
      mimeTypes: ['text/json'],
      extensions: ['.glu', '.GLU'],
      fileFormat: 'text',
      contentType: 'glu'
    });
    console.log('activated', app.docRegistry);
  }
};

export default [gluePlugin];
