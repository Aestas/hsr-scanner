import { create } from 'zustand';

import { RatingRule, RatingTemplate, RatingTemplateStore } from '../types.ts';

import {
  createOrUpdateRelicRatingRule,
  createOrUpdateRelicRulesTemplate,
  getAllRelicRulesTemplates,
  removeRelicRulesTemplate,
} from '@/utils/relicRulesTemplateUtils.ts';

type RelicTemplateStore = {
  relicRatingRulesTemplateStore: RatingTemplateStore | null;

  fetchRelicRatingRulesTemplateStore: () => Promise<void>;

  createOrUpdateRelicRatingRulesTemplate: (
    templateId: string,
    relicRulesTemplate: RatingTemplate
  ) => Promise<{
    success: boolean;
    message: string;
  }>;

  removeRelicRatingRulesTemplate: (templateId: string) => Promise<{ success: boolean; message: string }>;

  currentRelicRatingRulesTemplate: RatingTemplate | null;

  setCurrentRelicRatingRulesTemplate: (template: RatingTemplate) => void;

  createOrUpdateRelicRatingRule: (
    templateId: string,
    ruleId: string,
    rule: RatingRule
  ) => Promise<{
    success: boolean;
    message: string;
  }>;
};

export const useRelicTemplateStore = create<RelicTemplateStore>(set => ({
  relicRatingRulesTemplateStore: null,

  fetchRelicRatingRulesTemplateStore: async () => {
    await getAllRelicRulesTemplates();
  },

  createOrUpdateRelicRatingRulesTemplate: async (templateId, relicRulesTemplate) => {
    return await createOrUpdateRelicRulesTemplate(templateId, relicRulesTemplate);
  },

  removeRelicRatingRulesTemplate: async templateId => {
    return await removeRelicRulesTemplate(templateId);
  },

  currentRelicRatingRulesTemplate: null,

  setCurrentRelicRatingRulesTemplate: template => {
    set({ currentRelicRatingRulesTemplate: template });
  },

  createOrUpdateRelicRatingRule: async (templateId, ruleId, rule) => {
    return await createOrUpdateRelicRatingRule(templateId, ruleId, rule);
  },
}));

useRelicTemplateStore.getState().fetchRelicRatingRulesTemplateStore();

export default useRelicTemplateStore;
