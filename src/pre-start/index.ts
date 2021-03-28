import path from 'path';
import dotenv from 'dotenv';
import commandLineArgs from 'command-line-args';

{
  const optionDefinitions = [
    {
      name: 'env',
      alias: 'e',
      defaultValue: 'development',
      type: String,
    },
  ];

  const commandLineOptions = commandLineArgs(optionDefinitions);

  const dotenvConfigOptions = {
    path: path.join(__dirname, `env/${commandLineOptions.env}.env`),
  }

  const dotenvConfigOutput = dotenv.config(dotenvConfigOptions);

  if (dotenvConfigOutput.error) {
    throw dotenvConfigOutput.error;
  }
}
