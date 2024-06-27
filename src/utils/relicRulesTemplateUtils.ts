import { RatingTemplate, RatingTemplateStore } from '../types.ts';

import useRelicTemplateStore from '@/hooks/use-relic-template-store.ts';

const getAllRelicRulesTemplates = async (): Promise<RatingTemplateStore> => {
  const templates = await (window as any).ipcRenderer.storeGet(`data.ratingTemplates`);

  // update relicRulesTemplateStore
  useRelicTemplateStore.setState({ relicRulesTemplateStore: templates });

  return templates as RatingTemplateStore;
};

const createRelicRulesTemplate = async (
  templateId: string,
  relicRulesTemplate: RatingTemplate
): Promise<{
  success: boolean;
  message: string;
}> => {
  // get all relicRulesTemplates
  const relicRulesTemplates = useRelicTemplateStore.getState().relicRulesTemplateStore;

  if (!relicRulesTemplates) {
    return {
      success: false,
      message: '无法找到模板储存，请向Github提交issue',
    };
  }

  // add new relicRulesTemplate
  relicRulesTemplates[templateId] = relicRulesTemplate;

  // save relicRulesTemplates
  await (window as any).ipcRenderer.storeSet(`data.ratingTemplates`, relicRulesTemplates);

  // update relicRulesTemplateStore
  useRelicTemplateStore.setState({
    relicRulesTemplateStore: relicRulesTemplates,
    currentRelicRulesTemplate: relicRulesTemplate,
  });

  return {
    success: true,
    message: '成功创建遗器模板',
  };
};

const removeRelicRulesTemplate = async (templateId: string): Promise<{ success: boolean; message: string }> => {
  // get all relicRulesTemplates
  const relicRulesTemplates = useRelicTemplateStore.getState().relicRulesTemplateStore;

  if (!relicRulesTemplates) {
    return {
      success: false,
      message: '无法找到当前遗器模板，请向Github提交issue',
    };
  }

  // remove relicRulesTemplate
  delete relicRulesTemplates[templateId];

  // save relicRulesTemplates
  await (window as any).ipcRenderer.storeSet(`data.ratingTemplates`, relicRulesTemplates);

  // update relicRulesTemplateStore
  useRelicTemplateStore.setState({ relicRulesTemplateStore: relicRulesTemplates });

  return {
    success: true,
    message: '成功删除遗器模板',
  };
};

export { getAllRelicRulesTemplates, createRelicRulesTemplate, removeRelicRulesTemplate };
