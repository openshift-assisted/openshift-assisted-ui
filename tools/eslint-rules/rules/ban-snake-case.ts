/**
 * This file sets you up with with structure needed for an ESLint rule.
 *
 * It leverages utilities from @typescript-eslint to allow TypeScript to
 * provide autocompletions etc for the configuration.
 *
 * Your rule's custom logic will live within the create() method below
 * and you can learn more about writing ESLint rules on the official guide:
 *
 * https://eslint.org/docs/developer-guide/working-with-rules
 *
 * You can also view many examples of existing rules here:
 *
 * https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin/src/rules
 */

 import { ESLintUtils, TSESLint, TSESTree } from '@typescript-eslint/experimental-utils';
import { ANY_PROPERTY_SIGNATURE_IDENTIFIER } from '../utils/selectors';
 import { SNAKE_CASE_REGEX, toCamelCase } from '../utils/string-extensions';

 // NOTE: The rule will be available in ESLint configs as "@nrwl/nx/workspace/ban-snake-case"
 export const RULE_NAME = 'ban-snake-case';
 export type MessageIds = 'banSnakeCase';
 export type Options = [];

 export const rule = ESLintUtils.RuleCreator(() => __filename)({
   name: RULE_NAME,
   meta: {
     type: 'problem',
     fixable: 'code',
     docs: {
       description: 'Force property signature identifiers to be written in camelCase',
       recommended: 'error',
     },
     schema: [],
     messages: {
       banSnakeCase: 'Property signatures must be written in camelCase',
     },
   },
   defaultOptions: [],
   create(context) {
     return {
       [ANY_PROPERTY_SIGNATURE_IDENTIFIER]: (
         identifier: TSESTree.Identifier,
       ) => {
         if (SNAKE_CASE_REGEX.test(identifier.name)) {
           context.report({
             node: identifier,
             loc: identifier.loc,
             messageId: 'banSnakeCase',
             fix: (fixer: TSESLint.RuleFixer): TSESLint.RuleFix => {
               return fixer.replaceText(
                 identifier,
                 toCamelCase(identifier.name),
               );
             },
           });
         }
       },
     };
   },
 });
