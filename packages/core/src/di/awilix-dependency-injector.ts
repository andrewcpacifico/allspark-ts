import {
  asClass,
  asFunction,
  asValue,
  AwilixContainer,
  createContainer,
  Lifetime,
  Resolver,
} from 'awilix';

import {
  IDependencyInjector,
  LoadModulesArgs,
  DependencyType,
  RegisterArgs,
} from './dependency-injector';

export class AwilixDependencyInjector<C> implements IDependencyInjector<C> {
  private container!: AwilixContainer;

  initialize(): C {
    this.container = createContainer();

    this.container.register('process', asValue(process));

    return this.container.cradle;
  }

  loadModules({
    path,
    suffix,
    index,
  }: LoadModulesArgs): string[] {
    const pattern = process.env.NODE_ENV === 'production' ||
      process.env.NODE_ENV === 'staging'
      ? `dist/${path}/**/!(*.test).js`
      : `src/${path}/**/!(*.test|*.d).ts`;

    const camelCase = (tokens: string[]): string => tokens.map((token, idx) => {
      if (idx === 0) {
        return token;
      }

      return token.charAt(0).toUpperCase() + token.substring(1);
    }).join('');

    const loadedModules: string[] = [];
    this.container.loadModules([pattern], {
      resolverOptions: { lifetime: Lifetime.SINGLETON },
      formatName: (name, descriptor) => {
        const tokens: string[] = [];

        const regex = new RegExp(`.*${path}/?(.*)/${name}.*`);
        const subpath = regex.exec(descriptor.path);
        if (subpath && subpath[1] !== '') {
          const splat = subpath[1].split('/');
          splat.forEach((pathToken) => {
            tokens.push(...pathToken.split('-'));
          });
        }

        if (name !== 'index') {
          const nameTokens = name.split('-');
          tokens.push(...nameTokens);
        }

        if (suffix) {
          tokens.push(suffix);
        }

        const camelCaseName = camelCase(tokens);
        loadedModules.push(`${camelCaseName}`);

        return `${camelCaseName}`;
      },
    });

    if (index) {
      this.register([{
        name: index,
        dependency: loadedModules.map((module) => this.container.cradle[module]),
        type: DependencyType.VALUE,
      }]);
    }

    return loadedModules;
  }

  register(dependencies: RegisterArgs[]) {
    dependencies.forEach(({
      name,
      dependency,
      type = DependencyType.CLASS,
      singleton = true,
    }) => {
      let resolver: Resolver<any>;
      const lifetime = singleton ? Lifetime.SINGLETON : Lifetime.TRANSIENT;

      if (type === DependencyType.VALUE) {
        resolver = asValue(dependency);
      } else {
        resolver = type === DependencyType.CLASS
          ? asClass(dependency).setLifetime(lifetime)
          : asFunction(dependency).setLifetime(lifetime);
      }

      this.container.register(name, resolver);
    });
  }

  registerThirdPartyDependencies(dependencies: {[key: string]: any}) {
    Object.keys(dependencies).forEach((dependencyName) => {
      const dependency: any = dependencies[dependencyName];
      this.register([{
        name: dependencyName,
        dependency,
        type: DependencyType.VALUE,
      }]);
    });
  }
}

