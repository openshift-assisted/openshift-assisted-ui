import { TSESLint } from '@typescript-eslint/experimental-utils';
import { MessageIds, rule, RULE_NAME } from './ban-snake-case';

const ruleTester = new TSESLint.RuleTester({
  parser: require.resolve('@typescript-eslint/parser'),
});

const validScenario = `
export interface SystemVendor {
  manufacturer?: string;
  productName?: string;
  serialNumber?: string;
  /**
   * Whether the machine appears to be a virtual machine or not
   */
  virtual?: boolean;
}`;

const invalidScenario = `
export interface SystemVendor {
  manufacturer?: string;
  product_name?: string;
  serial_number?: string;
  /**
   * Whether the machine appears to be a virtual machine or not
   */
  virtual?: boolean;
}`;

const messageId: MessageIds = 'banSnakeCase';

ruleTester.run(RULE_NAME, rule, {
  valid: [validScenario],
  invalid: [
    {
      code: invalidScenario,
      errors: [{ messageId }, { messageId }],
      output: validScenario,
    },
  ],
});
