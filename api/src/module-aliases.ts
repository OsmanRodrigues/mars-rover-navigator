import ModuleAlias from 'module-alias';

ModuleAlias.addAliases({
  '@root': __dirname,
  '@adapter': __dirname.concat('/adapter'),
  '@data': __dirname.concat('/data'),
  '@domain': __dirname.concat('/domain'),
  '@model': __dirname.concat('/model'),
  '@modules': __dirname.concat('/modules')
});
