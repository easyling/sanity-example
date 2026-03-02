import type {DocumentDefinition} from 'sanity'
import {defineField} from 'sanity'

import {Dropdowns} from '../../../dialogs/dropdowns'

// We add DL suffix to all name fields to mitigate conflicts in others documents
export const withDataLayer = (doc: DocumentDefinition) => {
  const dataLayerAttributes = {
    name: 'dataLayer',
    title: 'Data Layer',
  }
  return {
    ...doc,
    groups: [...(doc?.groups ?? []), dataLayerAttributes],
    fieldsets: [...(doc?.fieldsets ?? []), dataLayerAttributes],
    fields: [
      ...(doc.fields.map((field) => ({
        ...field,
        group: field.group,
      })) ?? []),
      defineField({
        title: 'Content Type',
        name: 'contentTypeDL',
        type: 'string',
        options: {
          list: Dropdowns.ContentTypeDataLayer,
        },
        group: 'dataLayer',
        fieldset: 'dataLayer',
      }),
      defineField({
        title: 'Date',
        name: 'dateDL',
        type: 'string',
        options: {
          list: Dropdowns.DateDataLayer,
        },
        group: 'dataLayer',
        fieldset: 'dataLayer',
      }),
      defineField({
        title: 'Deployment Mode',
        name: 'deploymentModeDL',
        type: 'string',
        options: {
          list: Dropdowns.DeploymentModeDataLayer,
        },
        group: 'dataLayer',
        fieldset: 'dataLayer',
      }),
      defineField({
        title: 'GTM Priority',
        name: 'gtmPriorityDL',
        type: 'string',
        options: {
          list: Dropdowns.GTMPriorityDataLayer,
        },
        group: 'dataLayer',
        fieldset: 'dataLayer',
      }),
      defineField({
        title: 'Industry',
        name: 'industryDL',
        type: 'string',
        options: {
          list: Dropdowns.IndustryDataLayer,
        },
        group: 'dataLayer',
        fieldset: 'dataLayer',
      }),
      defineField({
        title: 'Product Category',
        name: 'productCategoryDL',
        type: 'string',
        options: {
          list: Dropdowns.ProductCategoryDataLayer,
        },
        group: 'dataLayer',
        fieldset: 'dataLayer',
      }),
      defineField({
        title: 'Region',
        name: 'regionDL',
        type: 'string',
        options: {
          list: Dropdowns.RegionDataLayer,
        },
        group: 'dataLayer',
        fieldset: 'dataLayer',
      }),
      defineField({
        title: 'Solution Area',
        name: 'solutionAreaDL',
        type: 'string',
        options: {
          list: Dropdowns.SolutionAreaDataLayer,
        },
        group: 'dataLayer',
        fieldset: 'dataLayer',
      }),
      defineField({
        title: 'Solution Use Case',
        name: 'solutionUseCaseDL',
        type: 'string',
        options: {
          list: Dropdowns.SolutionUseCaseDataLayer,
        },
        group: 'dataLayer',
        fieldset: 'dataLayer',
      }),
    ],
  }
}
