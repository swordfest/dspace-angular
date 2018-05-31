import { FieldParser } from './field-parser';
import { FormFieldModel } from '../models/form-field.model';
import { isNotEmpty } from '../../../empty.util';
import { IntegrationSearchOptions } from '../../../../core/integration/models/integration-options.model';
import { FormFieldMetadataValueObject } from '../models/form-field-metadata-value.model';
import { DynamicListCheckboxGroupModel } from '../ds-dynamic-form-ui/models/list/dynamic-list-checkbox-group.model';
import { DynamicListRadioGroupModel } from '../ds-dynamic-form-ui/models/list/dynamic-list-radio-group.model';

export class ListFieldParser extends FieldParser {
  searchOptions: IntegrationSearchOptions;

  constructor(protected configData: FormFieldModel,
              protected initFormValues,
              protected readOnly: boolean,
              protected authorityUuid: string) {
    super(configData, initFormValues, readOnly);
  }

  public modelFactory(fieldValue: FormFieldMetadataValueObject): any {
    const listModelConfig = this.initModel();
    listModelConfig.repeatable = this.configData.repeatable;

    if (this.configData.selectableMetadata[0].authority
      && this.configData.selectableMetadata[0].authority.length > 0) {

      if (isNotEmpty(this.getInitGroupValues())) {
        listModelConfig.value = [];
        this.getInitGroupValues().forEach((value: any) => {
          if (value instanceof FormFieldMetadataValueObject) {
            listModelConfig.value.push(value);
          } else {
            const valueObj = new FormFieldMetadataValueObject(value);
            listModelConfig.value.push(valueObj);
          }
        });
      }
      this.setAuthorityOptions(listModelConfig, this.authorityUuid);
    }

    let listModel;
    if (listModelConfig.repeatable) {
      listModelConfig.group = [];
      listModel = new DynamicListCheckboxGroupModel(listModelConfig);
    } else {
      listModelConfig.options = [];
      listModel = new DynamicListRadioGroupModel(listModelConfig);
    }

    return listModel;
  }

}
