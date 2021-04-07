import ModuleAlias from 'module-alias';

ModuleAlias.addAliases({
  '@root': __dirname,
  '@adapter': __dirname.concat('/adapter'),
  '@domain': __dirname.concat('/domain'),
  '@model': __dirname.concat('/model')
});
