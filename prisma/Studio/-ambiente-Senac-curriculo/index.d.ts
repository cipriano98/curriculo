import {
  DMMF,
  DMMFClass,
  Engine,
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
  PrismaClientRustPanicError,
  PrismaClientInitializationError,
  PrismaClientValidationError,
  sqltag as sql,
  empty,
  join,
  raw,
  Sql,
} from './runtime';

export { PrismaClientKnownRequestError }
export { PrismaClientUnknownRequestError }
export { PrismaClientRustPanicError }
export { PrismaClientInitializationError }
export { PrismaClientValidationError }

/**
 * Re-export of sql-template-tag
 */
export { sql, empty, join, raw, Sql }

/**
 * Prisma Client JS version: 2.9.0
 * Query Engine version: 369b3694b7edb869fad14827a33ad3f3f49bbc20
 */
export declare type PrismaVersion = {
  client: string
}

export declare const prismaVersion: PrismaVersion 

/**
 * Utility Types
 */

/**
 * From https://github.com/sindresorhus/type-fest/
 * Matches a JSON object.
 * This type can be useful to enforce some input to be JSON-compatible or as a super-type to be extended from. 
 */
export declare type JsonObject = {[Key in string]?: JsonValue}
 
/**
 * From https://github.com/sindresorhus/type-fest/
 * Matches a JSON array.
 */
export declare interface JsonArray extends Array<JsonValue> {}
 
/**
 * From https://github.com/sindresorhus/type-fest/
 * Matches any valid JSON value.
 */
export declare type JsonValue = string | number | boolean | null | JsonObject | JsonArray

/**
 * Same as JsonObject, but allows undefined
 */
export declare type InputJsonObject = {[Key in string]?: JsonValue}
 
export declare interface InputJsonArray extends Array<JsonValue> {}
 
export declare type InputJsonValue = undefined |  string | number | boolean | null | InputJsonObject | InputJsonArray

declare type SelectAndInclude = {
  select: any
  include: any
}

declare type HasSelect = {
  select: any
}

declare type HasInclude = {
  include: any
}

declare type CheckSelect<T, S, U> = T extends SelectAndInclude
  ? 'Please either choose `select` or `include`'
  : T extends HasSelect
  ? U
  : T extends HasInclude
  ? U
  : S

/**
 * Get the type of the value, that the Promise holds.
 */
export declare type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

/**
 * Get the return type of a function which returns a Promise.
 */
export declare type PromiseReturnType<T extends (...args: any) => Promise<any>> = PromiseType<ReturnType<T>>


export declare type Enumerable<T> = T | Array<T>;

export type RequiredKeys<T> = {
  [K in keyof T]-?: {} extends Pick<T, K> ? never : K
}[keyof T]

export declare type TruthyKeys<T> = {
  [key in keyof T]: T[key] extends false | undefined | null ? never : key
}[keyof T]

export declare type TrueKeys<T> = TruthyKeys<Pick<T, RequiredKeys<T>>>

/**
 * Subset
 * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
 */
export declare type Subset<T, U> = {
  [key in keyof T]: key extends keyof U ? T[key] : never;
};
declare class PrismaClientFetcher {
  private readonly prisma;
  private readonly debug;
  private readonly hooks?;
  constructor(prisma: PrismaClient<any, any>, debug?: boolean, hooks?: Hooks | undefined);
  request<T>(document: any, dataPath?: string[], rootField?: string, typeName?: string, isList?: boolean, callsite?: string): Promise<T>;
  sanitizeMessage(message: string): string;
  protected unpack(document: any, data: any, path: string[], rootField?: string, isList?: boolean): any;
}


/**
 * Client
**/

export declare type Datasource = {
  url?: string
}

export type Datasources = {
  db?: Datasource
}

export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'

export interface PrismaClientOptions {
  /**
   * Overwrites the datasource url from your prisma.schema file
   */
  datasources?: Datasources

  /**
   * @default "colorless"
   */
  errorFormat?: ErrorFormat

  /**
   * @example
   * ```
   * // Defaults to stdout
   * log: ['query', 'info', 'warn', 'error']
   * 
   * // Emit as events
   * log: [
   *  { emit: 'stdout', level: 'query' },
   *  { emit: 'stdout', level: 'info' },
   *  { emit: 'stdout', level: 'warn' }
   *  { emit: 'stdout', level: 'error' }
   * ]
   * ```
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
   */
  log?: Array<LogLevel | LogDefinition>
}

export type Hooks = {
  beforeRequest?: (options: {query: string, path: string[], rootField?: string, typeName?: string, document: any}) => any
}

/* Types for Logging */
export type LogLevel = 'info' | 'query' | 'warn' | 'error'
export type LogDefinition = {
  level: LogLevel
  emit: 'stdout' | 'event'
}

export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
  GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
  : never

export type QueryEvent = {
  timestamp: Date
  query: string
  params: string
  duration: number
  target: string
}

export type LogEvent = {
  timestamp: Date
  message: string
  target: string
}
/* End Types for Logging */


export type PrismaAction =
  | 'findOne'
  | 'findMany'
  | 'findFirst'
  | 'create'
  | 'update'
  | 'updateMany'
  | 'upsert'
  | 'delete'
  | 'deleteMany'
  | 'executeRaw'
  | 'queryRaw'
  | 'aggregate'

/**
 * These options are being passed in to the middleware as "params"
 */
export type MiddlewareParams = {
  model?: string
  action: PrismaAction
  args: any
  dataPath: string[]
  runInTransaction: boolean
}

/**
 * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
 */
export type Middleware<T = any> = (
  params: MiddlewareParams,
  next: (params: MiddlewareParams) => Promise<T>,
) => Promise<T>

// tested in getLogLevel.test.ts
export declare function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js (ORM replacement)
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Profiles
 * const profiles = await prisma.profile.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export declare class PrismaClient<
  T extends PrismaClientOptions = PrismaClientOptions,
  U = 'log' extends keyof T ? T['log'] extends Array<LogLevel | LogDefinition> ? GetEvents<T['log']> : never : never
> {
  /**
   * @private
   */
  private fetcher;
  /**
   * @private
   */
  private readonly dmmf;
  /**
   * @private
   */
  private connectionPromise?;
  /**
   * @private
   */
  private disconnectionPromise?;
  /**
   * @private
   */
  private readonly engineConfig;
  /**
   * @private
   */
  private readonly measurePerformance;
  /**
   * @private
   */
  private engine: Engine;
  /**
   * @private
   */
  private errorFormat: ErrorFormat;

  /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js (ORM replacement)
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Profiles
   * const profiles = await prisma.profile.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */
  constructor(optionsArg?: T);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? QueryEvent : LogEvent) => void): void;
  /**
   * @deprecated renamed to `$on`
   */
  on<V extends U>(eventType: V, callback: (event: V extends 'query' ? QueryEvent : LogEvent) => void): void;
  /**
   * Connect with the database
   */
  $connect(): Promise<void>;
  /**
   * @deprecated renamed to `$connect`
   */
  connect(): Promise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): Promise<any>;
  /**
   * @deprecated renamed to `$disconnect`
   */
  disconnect(): Promise<any>;

  /**
   * Add a middleware
   */
  $use(cb: Middleware): void

  /**
   * Executes a raw query and returns the number of affected rows
   * @example
   * ```
   * // With parameters use prisma.executeRaw``, values will be escaped automatically
   * const result = await prisma.executeRaw`UPDATE User SET cool = ${true} WHERE id = ${1};`
   * // Or
   * const result = await prisma.executeRaw('UPDATE User SET cool = $1 WHERE id = $2 ;', true, 1)
  * ```
  * 
  * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
  */
  $executeRaw<T = any>(query: string | TemplateStringsArray, ...values: any[]): Promise<number>;

  /**
   * @deprecated renamed to `$executeRaw`
   */
  executeRaw<T = any>(query: string | TemplateStringsArray, ...values: any[]): Promise<number>;

  /**
   * Performs a raw query and returns the SELECT data
   * @example
   * ```
   * // With parameters use prisma.queryRaw``, values will be escaped automatically
   * const result = await prisma.queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'ema.il'};`
   * // Or
   * const result = await prisma.queryRaw('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'ema.il')
  * ```
  * 
  * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
  */
  $queryRaw<T = any>(query: string | TemplateStringsArray, ...values: any[]): Promise<T>;
 
  /**
   * @deprecated renamed to `$queryRaw`
   */
  queryRaw<T = any>(query: string | TemplateStringsArray, ...values: any[]): Promise<T>;

  /**
   * Execute queries in a transaction
   * @example
   * ```
   * const [george, bob, alice] = await prisma.transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   */
  $transaction: PromiseConstructor['all']
  /**
   * @deprecated renamed to `$transaction`
   */
  transaction: PromiseConstructor['all']

  /**
   * `prisma.profile`: Exposes CRUD operations for the **Profile** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Profiles
    * const profiles = await prisma.profile.findMany()
    * ```
    */
  get profile(): ProfileDelegate;

  /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): UserDelegate;

  /**
   * `prisma.address`: Exposes CRUD operations for the **Address** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Addresses
    * const addresses = await prisma.address.findMany()
    * ```
    */
  get address(): AddressDelegate;

  /**
   * `prisma.contact`: Exposes CRUD operations for the **Contact** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Contacts
    * const contacts = await prisma.contact.findMany()
    * ```
    */
  get contact(): ContactDelegate;

  /**
   * `prisma.curriculum`: Exposes CRUD operations for the **Curriculum** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Curricula
    * const curricula = await prisma.curriculum.findMany()
    * ```
    */
  get curriculum(): CurriculumDelegate;

  /**
   * `prisma.company`: Exposes CRUD operations for the **Company** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Companies
    * const companies = await prisma.company.findMany()
    * ```
    */
  get company(): CompanyDelegate;

  /**
   * `prisma.agency`: Exposes CRUD operations for the **Agency** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Agencies
    * const agencies = await prisma.agency.findMany()
    * ```
    */
  get agency(): AgencyDelegate;
}



/**
 * Enums
 */

// Based on
// https://github.com/microsoft/TypeScript/issues/3192#issuecomment-261720275

export declare const ProfileDistinctFieldEnum: {
  id: 'id',
  bio: 'bio',
  pseudonym: 'pseudonym',
  userId: 'userId',
  createdat: 'createdat',
  updatedat: 'updatedat'
};

export declare type ProfileDistinctFieldEnum = (typeof ProfileDistinctFieldEnum)[keyof typeof ProfileDistinctFieldEnum]


export declare const UserDistinctFieldEnum: {
  id: 'id',
  authenticationkey: 'authenticationkey',
  securitykey: 'securitykey',
  fullname: 'fullname',
  secret: 'secret',
  active: 'active',
  email: 'email',
  cpf: 'cpf',
  role: 'role',
  datebirth: 'datebirth',
  nickname: 'nickname',
  preferencialname: 'preferencialname',
  gender: 'gender',
  createdat: 'createdat',
  updatedat: 'updatedat'
};

export declare type UserDistinctFieldEnum = (typeof UserDistinctFieldEnum)[keyof typeof UserDistinctFieldEnum]


export declare const AddressDistinctFieldEnum: {
  id: 'id',
  name: 'name',
  logradouro: 'logradouro',
  bairro: 'bairro',
  cidade: 'cidade',
  state: 'state',
  cep: 'cep',
  createdat: 'createdat',
  updatedat: 'updatedat',
  userid: 'userid'
};

export declare type AddressDistinctFieldEnum = (typeof AddressDistinctFieldEnum)[keyof typeof AddressDistinctFieldEnum]


export declare const ContactDistinctFieldEnum: {
  id: 'id',
  userid: 'userid',
  talkto: 'talkto',
  phone: 'phone',
  createdat: 'createdat',
  updatedat: 'updatedat'
};

export declare type ContactDistinctFieldEnum = (typeof ContactDistinctFieldEnum)[keyof typeof ContactDistinctFieldEnum]


export declare const CurriculumDistinctFieldEnum: {
  id: 'id',
  userid: 'userid',
  professionalprofile: 'professionalprofile',
  createdat: 'createdat',
  updatedat: 'updatedat'
};

export declare type CurriculumDistinctFieldEnum = (typeof CurriculumDistinctFieldEnum)[keyof typeof CurriculumDistinctFieldEnum]


export declare const CompanyDistinctFieldEnum: {
  id: 'id',
  name: 'name',
  registrofederal: 'registrofederal',
  site: 'site',
  links: 'links',
  labellinks: 'labellinks',
  active: 'active',
  role: 'role',
  createdat: 'createdat',
  updatedat: 'updatedat'
};

export declare type CompanyDistinctFieldEnum = (typeof CompanyDistinctFieldEnum)[keyof typeof CompanyDistinctFieldEnum]


export declare const AgencyDistinctFieldEnum: {
  id: 'id',
  name: 'name',
  registrofederal: 'registrofederal',
  site: 'site',
  links: 'links',
  labellinks: 'labellinks',
  active: 'active',
  role: 'role',
  createdat: 'createdat',
  updatedat: 'updatedat'
};

export declare type AgencyDistinctFieldEnum = (typeof AgencyDistinctFieldEnum)[keyof typeof AgencyDistinctFieldEnum]


export declare const SortOrder: {
  asc: 'asc',
  desc: 'desc'
};

export declare type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


export declare const Role: {
  CANDIDATE: 'CANDIDATE',
  EMPLOYER: 'EMPLOYER',
  ADMIN: 'ADMIN',
  VACANCYDISTRIBUTOR: 'VACANCYDISTRIBUTOR'
};

export declare type Role = (typeof Role)[keyof typeof Role]


export declare const Gender: {
  MASCULINO: 'MASCULINO',
  FEMININO: 'FEMININO',
  OUTRO: 'OUTRO'
};

export declare type Gender = (typeof Gender)[keyof typeof Gender]


export declare const QueryMode: {
  default: 'default',
  insensitive: 'insensitive'
};

export declare type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]



/**
 * Model Profile
 */

export type Profile = {
  id: string
  bio: string | null
  pseudonym: string | null
  userId: number
  createdat: Date
  updatedat: Date
}


export type AggregateProfile = {
  count: number
  avg: ProfileAvgAggregateOutputType | null
  sum: ProfileSumAggregateOutputType | null
  min: ProfileMinAggregateOutputType | null
  max: ProfileMaxAggregateOutputType | null
}

export type ProfileAvgAggregateOutputType = {
  userId: number
}

export type ProfileSumAggregateOutputType = {
  userId: number
}

export type ProfileMinAggregateOutputType = {
  userId: number
}

export type ProfileMaxAggregateOutputType = {
  userId: number
}


export type ProfileAvgAggregateInputType = {
  userId?: true
}

export type ProfileSumAggregateInputType = {
  userId?: true
}

export type ProfileMinAggregateInputType = {
  userId?: true
}

export type ProfileMaxAggregateInputType = {
  userId?: true
}

export type AggregateProfileArgs = {
  where?: ProfileWhereInput
  orderBy?: Enumerable<ProfileOrderByInput> | ProfileOrderByInput
  cursor?: ProfileWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<ProfileDistinctFieldEnum>
  count?: true
  avg?: ProfileAvgAggregateInputType
  sum?: ProfileSumAggregateInputType
  min?: ProfileMinAggregateInputType
  max?: ProfileMaxAggregateInputType
}

export type GetProfileAggregateType<T extends AggregateProfileArgs> = {
  [P in keyof T]: P extends 'count' ? number : GetProfileAggregateScalarType<T[P]>
}

export type GetProfileAggregateScalarType<T extends any> = {
  [P in keyof T]: P extends keyof ProfileAvgAggregateOutputType ? ProfileAvgAggregateOutputType[P] : never
}
    
    

export type ProfileSelect = {
  id?: boolean
  bio?: boolean
  pseudonym?: boolean
  User?: boolean | UserArgs
  userId?: boolean
  createdat?: boolean
  updatedat?: boolean
}

export type ProfileInclude = {
  User?: boolean | UserArgs
}

export type ProfileGetPayload<
  S extends boolean | null | undefined | ProfileArgs,
  U = keyof S
> = S extends true
  ? Profile
  : S extends undefined
  ? never
  : S extends ProfileArgs | FindManyProfileArgs
  ? 'include' extends U
    ? Profile  & {
      [P in TrueKeys<S['include']>]:
      P extends 'User'
      ? UserGetPayload<S['include'][P]> : never
    }
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof Profile ? Profile[P]
: 
      P extends 'User'
      ? UserGetPayload<S['select'][P]> : never
    }
  : Profile
: Profile


export interface ProfileDelegate {
  /**
   * Find zero or one Profile that matches the filter.
   * @param {FindOneProfileArgs} args - Arguments to find a Profile
   * @example
   * // Get one Profile
   * const profile = await prisma.profile.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findOne<T extends FindOneProfileArgs>(
    args: Subset<T, FindOneProfileArgs>
  ): CheckSelect<T, Prisma__ProfileClient<Profile | null>, Prisma__ProfileClient<ProfileGetPayload<T> | null>>
  /**
   * Find the first Profile that matches the filter.
   * @param {FindFirstProfileArgs} args - Arguments to find a Profile
   * @example
   * // Get one Profile
   * const profile = await prisma.profile.findFirst({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findFirst<T extends FindFirstProfileArgs>(
    args?: Subset<T, FindFirstProfileArgs>
  ): CheckSelect<T, Prisma__ProfileClient<Profile | null>, Prisma__ProfileClient<ProfileGetPayload<T> | null>>
  /**
   * Find zero or more Profiles that matches the filter.
   * @param {FindManyProfileArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all Profiles
   * const profiles = await prisma.profile.findMany()
   * 
   * // Get first 10 Profiles
   * const profiles = await prisma.profile.findMany({ take: 10 })
   * 
   * // Only select the `id`
   * const profileWithIdOnly = await prisma.profile.findMany({ select: { id: true } })
   * 
  **/
  findMany<T extends FindManyProfileArgs>(
    args?: Subset<T, FindManyProfileArgs>
  ): CheckSelect<T, Promise<Array<Profile>>, Promise<Array<ProfileGetPayload<T>>>>
  /**
   * Create a Profile.
   * @param {ProfileCreateArgs} args - Arguments to create a Profile.
   * @example
   * // Create one Profile
   * const Profile = await prisma.profile.create({
   *   data: {
   *     // ... data to create a Profile
   *   }
   * })
   * 
  **/
  create<T extends ProfileCreateArgs>(
    args: Subset<T, ProfileCreateArgs>
  ): CheckSelect<T, Prisma__ProfileClient<Profile>, Prisma__ProfileClient<ProfileGetPayload<T>>>
  /**
   * Delete a Profile.
   * @param {ProfileDeleteArgs} args - Arguments to delete one Profile.
   * @example
   * // Delete one Profile
   * const Profile = await prisma.profile.delete({
   *   where: {
   *     // ... filter to delete one Profile
   *   }
   * })
   * 
  **/
  delete<T extends ProfileDeleteArgs>(
    args: Subset<T, ProfileDeleteArgs>
  ): CheckSelect<T, Prisma__ProfileClient<Profile>, Prisma__ProfileClient<ProfileGetPayload<T>>>
  /**
   * Update one Profile.
   * @param {ProfileUpdateArgs} args - Arguments to update one Profile.
   * @example
   * // Update one Profile
   * const profile = await prisma.profile.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  update<T extends ProfileUpdateArgs>(
    args: Subset<T, ProfileUpdateArgs>
  ): CheckSelect<T, Prisma__ProfileClient<Profile>, Prisma__ProfileClient<ProfileGetPayload<T>>>
  /**
   * Delete zero or more Profiles.
   * @param {ProfileDeleteManyArgs} args - Arguments to filter Profiles to delete.
   * @example
   * // Delete a few Profiles
   * const { count } = await prisma.profile.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   * 
  **/
  deleteMany<T extends ProfileDeleteManyArgs>(
    args: Subset<T, ProfileDeleteManyArgs>
  ): Promise<BatchPayload>
  /**
   * Update zero or more Profiles.
   * @param {ProfileUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many Profiles
   * const profile = await prisma.profile.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  updateMany<T extends ProfileUpdateManyArgs>(
    args: Subset<T, ProfileUpdateManyArgs>
  ): Promise<BatchPayload>
  /**
   * Create or update one Profile.
   * @param {ProfileUpsertArgs} args - Arguments to update or create a Profile.
   * @example
   * // Update or create a Profile
   * const profile = await prisma.profile.upsert({
   *   create: {
   *     // ... data to create a Profile
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the Profile we want to update
   *   }
   * })
  **/
  upsert<T extends ProfileUpsertArgs>(
    args: Subset<T, ProfileUpsertArgs>
  ): CheckSelect<T, Prisma__ProfileClient<Profile>, Prisma__ProfileClient<ProfileGetPayload<T>>>
  /**
   * Count
   */
  count(args?: Omit<FindManyProfileArgs, 'select' | 'include'>): Promise<number>

  /**
   * Aggregate
   */
  aggregate<T extends AggregateProfileArgs>(args: Subset<T, AggregateProfileArgs>): Promise<GetProfileAggregateType<T>>
}

/**
 * The delegate class that acts as a "Promise-like" for Profile.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in 
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export declare class Prisma__ProfileClient<T> implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  constructor(_dmmf: DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';

  User<T extends UserArgs = {}>(args?: Subset<T, UserArgs>): CheckSelect<T, Prisma__UserClient<User | null>, Prisma__UserClient<UserGetPayload<T> | null>>;

  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * Profile findOne
 */
export type FindOneProfileArgs = {
  /**
   * Select specific fields to fetch from the Profile
  **/
  select?: ProfileSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: ProfileInclude | null
  /**
   * Filter, which Profile to fetch.
  **/
  where: ProfileWhereUniqueInput
}


/**
 * Profile findFirst
 */
export type FindFirstProfileArgs = {
  /**
   * Select specific fields to fetch from the Profile
  **/
  select?: ProfileSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: ProfileInclude | null
  /**
   * Filter, which Profile to fetch.
  **/
  where?: ProfileWhereInput
  orderBy?: Enumerable<ProfileOrderByInput> | ProfileOrderByInput
  cursor?: ProfileWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<ProfileDistinctFieldEnum>
}


/**
 * Profile findMany
 */
export type FindManyProfileArgs = {
  /**
   * Select specific fields to fetch from the Profile
  **/
  select?: ProfileSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: ProfileInclude | null
  /**
   * Filter, which Profiles to fetch.
  **/
  where?: ProfileWhereInput
  /**
   * Determine the order of the Profiles to fetch.
  **/
  orderBy?: Enumerable<ProfileOrderByInput> | ProfileOrderByInput
  /**
   * Sets the position for listing Profiles.
  **/
  cursor?: ProfileWhereUniqueInput
  /**
   * The number of Profiles to fetch. If negative number, it will take Profiles before the `cursor`.
  **/
  take?: number
  /**
   * Skip the first `n` Profiles.
  **/
  skip?: number
  distinct?: Enumerable<ProfileDistinctFieldEnum>
}


/**
 * Profile create
 */
export type ProfileCreateArgs = {
  /**
   * Select specific fields to fetch from the Profile
  **/
  select?: ProfileSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: ProfileInclude | null
  /**
   * The data needed to create a Profile.
  **/
  data: ProfileCreateInput
}


/**
 * Profile update
 */
export type ProfileUpdateArgs = {
  /**
   * Select specific fields to fetch from the Profile
  **/
  select?: ProfileSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: ProfileInclude | null
  /**
   * The data needed to update a Profile.
  **/
  data: ProfileUpdateInput
  /**
   * Choose, which Profile to update.
  **/
  where: ProfileWhereUniqueInput
}


/**
 * Profile updateMany
 */
export type ProfileUpdateManyArgs = {
  data: ProfileUpdateManyMutationInput
  where?: ProfileWhereInput
}


/**
 * Profile upsert
 */
export type ProfileUpsertArgs = {
  /**
   * Select specific fields to fetch from the Profile
  **/
  select?: ProfileSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: ProfileInclude | null
  /**
   * The filter to search for the Profile to update in case it exists.
  **/
  where: ProfileWhereUniqueInput
  /**
   * In case the Profile found by the `where` argument doesn't exist, create a new Profile with this data.
  **/
  create: ProfileCreateInput
  /**
   * In case the Profile was found with the provided `where` argument, update it with this data.
  **/
  update: ProfileUpdateInput
}


/**
 * Profile delete
 */
export type ProfileDeleteArgs = {
  /**
   * Select specific fields to fetch from the Profile
  **/
  select?: ProfileSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: ProfileInclude | null
  /**
   * Filter which Profile to delete.
  **/
  where: ProfileWhereUniqueInput
}


/**
 * Profile deleteMany
 */
export type ProfileDeleteManyArgs = {
  where?: ProfileWhereInput
}


/**
 * Profile without action
 */
export type ProfileArgs = {
  /**
   * Select specific fields to fetch from the Profile
  **/
  select?: ProfileSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: ProfileInclude | null
}



/**
 * Model User
 */

export type User = {
  id: number
  authenticationkey: string
  securitykey: string
  fullname: string
  secret: string | null
  active: boolean
  email: string
  cpf: string
  role: Role
  datebirth: string | null
  nickname: string | null
  preferencialname: string | null
  gender: Gender
  createdat: Date
  updatedat: Date
}


export type AggregateUser = {
  count: number
  avg: UserAvgAggregateOutputType | null
  sum: UserSumAggregateOutputType | null
  min: UserMinAggregateOutputType | null
  max: UserMaxAggregateOutputType | null
}

export type UserAvgAggregateOutputType = {
  id: number
}

export type UserSumAggregateOutputType = {
  id: number
}

export type UserMinAggregateOutputType = {
  id: number
}

export type UserMaxAggregateOutputType = {
  id: number
}


export type UserAvgAggregateInputType = {
  id?: true
}

export type UserSumAggregateInputType = {
  id?: true
}

export type UserMinAggregateInputType = {
  id?: true
}

export type UserMaxAggregateInputType = {
  id?: true
}

export type AggregateUserArgs = {
  where?: UserWhereInput
  orderBy?: Enumerable<UserOrderByInput> | UserOrderByInput
  cursor?: UserWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<UserDistinctFieldEnum>
  count?: true
  avg?: UserAvgAggregateInputType
  sum?: UserSumAggregateInputType
  min?: UserMinAggregateInputType
  max?: UserMaxAggregateInputType
}

export type GetUserAggregateType<T extends AggregateUserArgs> = {
  [P in keyof T]: P extends 'count' ? number : GetUserAggregateScalarType<T[P]>
}

export type GetUserAggregateScalarType<T extends any> = {
  [P in keyof T]: P extends keyof UserAvgAggregateOutputType ? UserAvgAggregateOutputType[P] : never
}
    
    

export type UserSelect = {
  id?: boolean
  authenticationkey?: boolean
  securitykey?: boolean
  fullname?: boolean
  secret?: boolean
  active?: boolean
  email?: boolean
  cpf?: boolean
  role?: boolean
  datebirth?: boolean
  nickname?: boolean
  preferencialname?: boolean
  gender?: boolean
  Profile?: boolean | ProfileArgs
  Address?: boolean | FindManyAddressArgs
  Contact?: boolean | FindManyContactArgs
  Curriculum?: boolean | CurriculumArgs
  createdat?: boolean
  updatedat?: boolean
}

export type UserInclude = {
  Profile?: boolean | ProfileArgs
  Address?: boolean | FindManyAddressArgs
  Contact?: boolean | FindManyContactArgs
  Curriculum?: boolean | CurriculumArgs
}

export type UserGetPayload<
  S extends boolean | null | undefined | UserArgs,
  U = keyof S
> = S extends true
  ? User
  : S extends undefined
  ? never
  : S extends UserArgs | FindManyUserArgs
  ? 'include' extends U
    ? User  & {
      [P in TrueKeys<S['include']>]:
      P extends 'Profile'
      ? ProfileGetPayload<S['include'][P]> :
      P extends 'Address'
      ? Array<AddressGetPayload<S['include'][P]>> :
      P extends 'Contact'
      ? Array<ContactGetPayload<S['include'][P]>> :
      P extends 'Curriculum'
      ? CurriculumGetPayload<S['include'][P]> : never
    }
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof User ? User[P]
: 
      P extends 'Profile'
      ? ProfileGetPayload<S['select'][P]> :
      P extends 'Address'
      ? Array<AddressGetPayload<S['select'][P]>> :
      P extends 'Contact'
      ? Array<ContactGetPayload<S['select'][P]>> :
      P extends 'Curriculum'
      ? CurriculumGetPayload<S['select'][P]> : never
    }
  : User
: User


export interface UserDelegate {
  /**
   * Find zero or one User that matches the filter.
   * @param {FindOneUserArgs} args - Arguments to find a User
   * @example
   * // Get one User
   * const user = await prisma.user.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findOne<T extends FindOneUserArgs>(
    args: Subset<T, FindOneUserArgs>
  ): CheckSelect<T, Prisma__UserClient<User | null>, Prisma__UserClient<UserGetPayload<T> | null>>
  /**
   * Find the first User that matches the filter.
   * @param {FindFirstUserArgs} args - Arguments to find a User
   * @example
   * // Get one User
   * const user = await prisma.user.findFirst({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findFirst<T extends FindFirstUserArgs>(
    args?: Subset<T, FindFirstUserArgs>
  ): CheckSelect<T, Prisma__UserClient<User | null>, Prisma__UserClient<UserGetPayload<T> | null>>
  /**
   * Find zero or more Users that matches the filter.
   * @param {FindManyUserArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all Users
   * const users = await prisma.user.findMany()
   * 
   * // Get first 10 Users
   * const users = await prisma.user.findMany({ take: 10 })
   * 
   * // Only select the `id`
   * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
   * 
  **/
  findMany<T extends FindManyUserArgs>(
    args?: Subset<T, FindManyUserArgs>
  ): CheckSelect<T, Promise<Array<User>>, Promise<Array<UserGetPayload<T>>>>
  /**
   * Create a User.
   * @param {UserCreateArgs} args - Arguments to create a User.
   * @example
   * // Create one User
   * const User = await prisma.user.create({
   *   data: {
   *     // ... data to create a User
   *   }
   * })
   * 
  **/
  create<T extends UserCreateArgs>(
    args: Subset<T, UserCreateArgs>
  ): CheckSelect<T, Prisma__UserClient<User>, Prisma__UserClient<UserGetPayload<T>>>
  /**
   * Delete a User.
   * @param {UserDeleteArgs} args - Arguments to delete one User.
   * @example
   * // Delete one User
   * const User = await prisma.user.delete({
   *   where: {
   *     // ... filter to delete one User
   *   }
   * })
   * 
  **/
  delete<T extends UserDeleteArgs>(
    args: Subset<T, UserDeleteArgs>
  ): CheckSelect<T, Prisma__UserClient<User>, Prisma__UserClient<UserGetPayload<T>>>
  /**
   * Update one User.
   * @param {UserUpdateArgs} args - Arguments to update one User.
   * @example
   * // Update one User
   * const user = await prisma.user.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  update<T extends UserUpdateArgs>(
    args: Subset<T, UserUpdateArgs>
  ): CheckSelect<T, Prisma__UserClient<User>, Prisma__UserClient<UserGetPayload<T>>>
  /**
   * Delete zero or more Users.
   * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
   * @example
   * // Delete a few Users
   * const { count } = await prisma.user.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   * 
  **/
  deleteMany<T extends UserDeleteManyArgs>(
    args: Subset<T, UserDeleteManyArgs>
  ): Promise<BatchPayload>
  /**
   * Update zero or more Users.
   * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many Users
   * const user = await prisma.user.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  updateMany<T extends UserUpdateManyArgs>(
    args: Subset<T, UserUpdateManyArgs>
  ): Promise<BatchPayload>
  /**
   * Create or update one User.
   * @param {UserUpsertArgs} args - Arguments to update or create a User.
   * @example
   * // Update or create a User
   * const user = await prisma.user.upsert({
   *   create: {
   *     // ... data to create a User
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the User we want to update
   *   }
   * })
  **/
  upsert<T extends UserUpsertArgs>(
    args: Subset<T, UserUpsertArgs>
  ): CheckSelect<T, Prisma__UserClient<User>, Prisma__UserClient<UserGetPayload<T>>>
  /**
   * Count
   */
  count(args?: Omit<FindManyUserArgs, 'select' | 'include'>): Promise<number>

  /**
   * Aggregate
   */
  aggregate<T extends AggregateUserArgs>(args: Subset<T, AggregateUserArgs>): Promise<GetUserAggregateType<T>>
}

/**
 * The delegate class that acts as a "Promise-like" for User.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in 
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export declare class Prisma__UserClient<T> implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  constructor(_dmmf: DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';

  Profile<T extends ProfileArgs = {}>(args?: Subset<T, ProfileArgs>): CheckSelect<T, Prisma__ProfileClient<Profile | null>, Prisma__ProfileClient<ProfileGetPayload<T> | null>>;

  Address<T extends FindManyAddressArgs = {}>(args?: Subset<T, FindManyAddressArgs>): CheckSelect<T, Promise<Array<Address>>, Promise<Array<AddressGetPayload<T>>>>;

  Contact<T extends FindManyContactArgs = {}>(args?: Subset<T, FindManyContactArgs>): CheckSelect<T, Promise<Array<Contact>>, Promise<Array<ContactGetPayload<T>>>>;

  Curriculum<T extends CurriculumArgs = {}>(args?: Subset<T, CurriculumArgs>): CheckSelect<T, Prisma__CurriculumClient<Curriculum | null>, Prisma__CurriculumClient<CurriculumGetPayload<T> | null>>;

  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * User findOne
 */
export type FindOneUserArgs = {
  /**
   * Select specific fields to fetch from the User
  **/
  select?: UserSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: UserInclude | null
  /**
   * Filter, which User to fetch.
  **/
  where: UserWhereUniqueInput
}


/**
 * User findFirst
 */
export type FindFirstUserArgs = {
  /**
   * Select specific fields to fetch from the User
  **/
  select?: UserSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: UserInclude | null
  /**
   * Filter, which User to fetch.
  **/
  where?: UserWhereInput
  orderBy?: Enumerable<UserOrderByInput> | UserOrderByInput
  cursor?: UserWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<UserDistinctFieldEnum>
}


/**
 * User findMany
 */
export type FindManyUserArgs = {
  /**
   * Select specific fields to fetch from the User
  **/
  select?: UserSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: UserInclude | null
  /**
   * Filter, which Users to fetch.
  **/
  where?: UserWhereInput
  /**
   * Determine the order of the Users to fetch.
  **/
  orderBy?: Enumerable<UserOrderByInput> | UserOrderByInput
  /**
   * Sets the position for listing Users.
  **/
  cursor?: UserWhereUniqueInput
  /**
   * The number of Users to fetch. If negative number, it will take Users before the `cursor`.
  **/
  take?: number
  /**
   * Skip the first `n` Users.
  **/
  skip?: number
  distinct?: Enumerable<UserDistinctFieldEnum>
}


/**
 * User create
 */
export type UserCreateArgs = {
  /**
   * Select specific fields to fetch from the User
  **/
  select?: UserSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: UserInclude | null
  /**
   * The data needed to create a User.
  **/
  data: UserCreateInput
}


/**
 * User update
 */
export type UserUpdateArgs = {
  /**
   * Select specific fields to fetch from the User
  **/
  select?: UserSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: UserInclude | null
  /**
   * The data needed to update a User.
  **/
  data: UserUpdateInput
  /**
   * Choose, which User to update.
  **/
  where: UserWhereUniqueInput
}


/**
 * User updateMany
 */
export type UserUpdateManyArgs = {
  data: UserUpdateManyMutationInput
  where?: UserWhereInput
}


/**
 * User upsert
 */
export type UserUpsertArgs = {
  /**
   * Select specific fields to fetch from the User
  **/
  select?: UserSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: UserInclude | null
  /**
   * The filter to search for the User to update in case it exists.
  **/
  where: UserWhereUniqueInput
  /**
   * In case the User found by the `where` argument doesn't exist, create a new User with this data.
  **/
  create: UserCreateInput
  /**
   * In case the User was found with the provided `where` argument, update it with this data.
  **/
  update: UserUpdateInput
}


/**
 * User delete
 */
export type UserDeleteArgs = {
  /**
   * Select specific fields to fetch from the User
  **/
  select?: UserSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: UserInclude | null
  /**
   * Filter which User to delete.
  **/
  where: UserWhereUniqueInput
}


/**
 * User deleteMany
 */
export type UserDeleteManyArgs = {
  where?: UserWhereInput
}


/**
 * User without action
 */
export type UserArgs = {
  /**
   * Select specific fields to fetch from the User
  **/
  select?: UserSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: UserInclude | null
}



/**
 * Model Address
 */

export type Address = {
  id: string
  name: string
  logradouro: string
  bairro: string
  cidade: string
  state: string | null
  cep: string
  createdat: Date
  updatedat: Date
  userid: number
}


export type AggregateAddress = {
  count: number
  avg: AddressAvgAggregateOutputType | null
  sum: AddressSumAggregateOutputType | null
  min: AddressMinAggregateOutputType | null
  max: AddressMaxAggregateOutputType | null
}

export type AddressAvgAggregateOutputType = {
  userid: number
}

export type AddressSumAggregateOutputType = {
  userid: number
}

export type AddressMinAggregateOutputType = {
  userid: number
}

export type AddressMaxAggregateOutputType = {
  userid: number
}


export type AddressAvgAggregateInputType = {
  userid?: true
}

export type AddressSumAggregateInputType = {
  userid?: true
}

export type AddressMinAggregateInputType = {
  userid?: true
}

export type AddressMaxAggregateInputType = {
  userid?: true
}

export type AggregateAddressArgs = {
  where?: AddressWhereInput
  orderBy?: Enumerable<AddressOrderByInput> | AddressOrderByInput
  cursor?: AddressWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<AddressDistinctFieldEnum>
  count?: true
  avg?: AddressAvgAggregateInputType
  sum?: AddressSumAggregateInputType
  min?: AddressMinAggregateInputType
  max?: AddressMaxAggregateInputType
}

export type GetAddressAggregateType<T extends AggregateAddressArgs> = {
  [P in keyof T]: P extends 'count' ? number : GetAddressAggregateScalarType<T[P]>
}

export type GetAddressAggregateScalarType<T extends any> = {
  [P in keyof T]: P extends keyof AddressAvgAggregateOutputType ? AddressAvgAggregateOutputType[P] : never
}
    
    

export type AddressSelect = {
  id?: boolean
  name?: boolean
  logradouro?: boolean
  bairro?: boolean
  cidade?: boolean
  state?: boolean
  cep?: boolean
  createdat?: boolean
  updatedat?: boolean
  User?: boolean | UserArgs
  userid?: boolean
}

export type AddressInclude = {
  User?: boolean | UserArgs
}

export type AddressGetPayload<
  S extends boolean | null | undefined | AddressArgs,
  U = keyof S
> = S extends true
  ? Address
  : S extends undefined
  ? never
  : S extends AddressArgs | FindManyAddressArgs
  ? 'include' extends U
    ? Address  & {
      [P in TrueKeys<S['include']>]:
      P extends 'User'
      ? UserGetPayload<S['include'][P]> : never
    }
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof Address ? Address[P]
: 
      P extends 'User'
      ? UserGetPayload<S['select'][P]> : never
    }
  : Address
: Address


export interface AddressDelegate {
  /**
   * Find zero or one Address that matches the filter.
   * @param {FindOneAddressArgs} args - Arguments to find a Address
   * @example
   * // Get one Address
   * const address = await prisma.address.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findOne<T extends FindOneAddressArgs>(
    args: Subset<T, FindOneAddressArgs>
  ): CheckSelect<T, Prisma__AddressClient<Address | null>, Prisma__AddressClient<AddressGetPayload<T> | null>>
  /**
   * Find the first Address that matches the filter.
   * @param {FindFirstAddressArgs} args - Arguments to find a Address
   * @example
   * // Get one Address
   * const address = await prisma.address.findFirst({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findFirst<T extends FindFirstAddressArgs>(
    args?: Subset<T, FindFirstAddressArgs>
  ): CheckSelect<T, Prisma__AddressClient<Address | null>, Prisma__AddressClient<AddressGetPayload<T> | null>>
  /**
   * Find zero or more Addresses that matches the filter.
   * @param {FindManyAddressArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all Addresses
   * const addresses = await prisma.address.findMany()
   * 
   * // Get first 10 Addresses
   * const addresses = await prisma.address.findMany({ take: 10 })
   * 
   * // Only select the `id`
   * const addressWithIdOnly = await prisma.address.findMany({ select: { id: true } })
   * 
  **/
  findMany<T extends FindManyAddressArgs>(
    args?: Subset<T, FindManyAddressArgs>
  ): CheckSelect<T, Promise<Array<Address>>, Promise<Array<AddressGetPayload<T>>>>
  /**
   * Create a Address.
   * @param {AddressCreateArgs} args - Arguments to create a Address.
   * @example
   * // Create one Address
   * const Address = await prisma.address.create({
   *   data: {
   *     // ... data to create a Address
   *   }
   * })
   * 
  **/
  create<T extends AddressCreateArgs>(
    args: Subset<T, AddressCreateArgs>
  ): CheckSelect<T, Prisma__AddressClient<Address>, Prisma__AddressClient<AddressGetPayload<T>>>
  /**
   * Delete a Address.
   * @param {AddressDeleteArgs} args - Arguments to delete one Address.
   * @example
   * // Delete one Address
   * const Address = await prisma.address.delete({
   *   where: {
   *     // ... filter to delete one Address
   *   }
   * })
   * 
  **/
  delete<T extends AddressDeleteArgs>(
    args: Subset<T, AddressDeleteArgs>
  ): CheckSelect<T, Prisma__AddressClient<Address>, Prisma__AddressClient<AddressGetPayload<T>>>
  /**
   * Update one Address.
   * @param {AddressUpdateArgs} args - Arguments to update one Address.
   * @example
   * // Update one Address
   * const address = await prisma.address.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  update<T extends AddressUpdateArgs>(
    args: Subset<T, AddressUpdateArgs>
  ): CheckSelect<T, Prisma__AddressClient<Address>, Prisma__AddressClient<AddressGetPayload<T>>>
  /**
   * Delete zero or more Addresses.
   * @param {AddressDeleteManyArgs} args - Arguments to filter Addresses to delete.
   * @example
   * // Delete a few Addresses
   * const { count } = await prisma.address.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   * 
  **/
  deleteMany<T extends AddressDeleteManyArgs>(
    args: Subset<T, AddressDeleteManyArgs>
  ): Promise<BatchPayload>
  /**
   * Update zero or more Addresses.
   * @param {AddressUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many Addresses
   * const address = await prisma.address.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  updateMany<T extends AddressUpdateManyArgs>(
    args: Subset<T, AddressUpdateManyArgs>
  ): Promise<BatchPayload>
  /**
   * Create or update one Address.
   * @param {AddressUpsertArgs} args - Arguments to update or create a Address.
   * @example
   * // Update or create a Address
   * const address = await prisma.address.upsert({
   *   create: {
   *     // ... data to create a Address
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the Address we want to update
   *   }
   * })
  **/
  upsert<T extends AddressUpsertArgs>(
    args: Subset<T, AddressUpsertArgs>
  ): CheckSelect<T, Prisma__AddressClient<Address>, Prisma__AddressClient<AddressGetPayload<T>>>
  /**
   * Count
   */
  count(args?: Omit<FindManyAddressArgs, 'select' | 'include'>): Promise<number>

  /**
   * Aggregate
   */
  aggregate<T extends AggregateAddressArgs>(args: Subset<T, AggregateAddressArgs>): Promise<GetAddressAggregateType<T>>
}

/**
 * The delegate class that acts as a "Promise-like" for Address.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in 
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export declare class Prisma__AddressClient<T> implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  constructor(_dmmf: DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';

  User<T extends UserArgs = {}>(args?: Subset<T, UserArgs>): CheckSelect<T, Prisma__UserClient<User | null>, Prisma__UserClient<UserGetPayload<T> | null>>;

  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * Address findOne
 */
export type FindOneAddressArgs = {
  /**
   * Select specific fields to fetch from the Address
  **/
  select?: AddressSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: AddressInclude | null
  /**
   * Filter, which Address to fetch.
  **/
  where: AddressWhereUniqueInput
}


/**
 * Address findFirst
 */
export type FindFirstAddressArgs = {
  /**
   * Select specific fields to fetch from the Address
  **/
  select?: AddressSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: AddressInclude | null
  /**
   * Filter, which Address to fetch.
  **/
  where?: AddressWhereInput
  orderBy?: Enumerable<AddressOrderByInput> | AddressOrderByInput
  cursor?: AddressWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<AddressDistinctFieldEnum>
}


/**
 * Address findMany
 */
export type FindManyAddressArgs = {
  /**
   * Select specific fields to fetch from the Address
  **/
  select?: AddressSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: AddressInclude | null
  /**
   * Filter, which Addresses to fetch.
  **/
  where?: AddressWhereInput
  /**
   * Determine the order of the Addresses to fetch.
  **/
  orderBy?: Enumerable<AddressOrderByInput> | AddressOrderByInput
  /**
   * Sets the position for listing Addresses.
  **/
  cursor?: AddressWhereUniqueInput
  /**
   * The number of Addresses to fetch. If negative number, it will take Addresses before the `cursor`.
  **/
  take?: number
  /**
   * Skip the first `n` Addresses.
  **/
  skip?: number
  distinct?: Enumerable<AddressDistinctFieldEnum>
}


/**
 * Address create
 */
export type AddressCreateArgs = {
  /**
   * Select specific fields to fetch from the Address
  **/
  select?: AddressSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: AddressInclude | null
  /**
   * The data needed to create a Address.
  **/
  data: AddressCreateInput
}


/**
 * Address update
 */
export type AddressUpdateArgs = {
  /**
   * Select specific fields to fetch from the Address
  **/
  select?: AddressSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: AddressInclude | null
  /**
   * The data needed to update a Address.
  **/
  data: AddressUpdateInput
  /**
   * Choose, which Address to update.
  **/
  where: AddressWhereUniqueInput
}


/**
 * Address updateMany
 */
export type AddressUpdateManyArgs = {
  data: AddressUpdateManyMutationInput
  where?: AddressWhereInput
}


/**
 * Address upsert
 */
export type AddressUpsertArgs = {
  /**
   * Select specific fields to fetch from the Address
  **/
  select?: AddressSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: AddressInclude | null
  /**
   * The filter to search for the Address to update in case it exists.
  **/
  where: AddressWhereUniqueInput
  /**
   * In case the Address found by the `where` argument doesn't exist, create a new Address with this data.
  **/
  create: AddressCreateInput
  /**
   * In case the Address was found with the provided `where` argument, update it with this data.
  **/
  update: AddressUpdateInput
}


/**
 * Address delete
 */
export type AddressDeleteArgs = {
  /**
   * Select specific fields to fetch from the Address
  **/
  select?: AddressSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: AddressInclude | null
  /**
   * Filter which Address to delete.
  **/
  where: AddressWhereUniqueInput
}


/**
 * Address deleteMany
 */
export type AddressDeleteManyArgs = {
  where?: AddressWhereInput
}


/**
 * Address without action
 */
export type AddressArgs = {
  /**
   * Select specific fields to fetch from the Address
  **/
  select?: AddressSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: AddressInclude | null
}



/**
 * Model Contact
 */

export type Contact = {
  id: string
  userid: number
  talkto: string
  phone: string
  createdat: Date
  updatedat: Date
}


export type AggregateContact = {
  count: number
  avg: ContactAvgAggregateOutputType | null
  sum: ContactSumAggregateOutputType | null
  min: ContactMinAggregateOutputType | null
  max: ContactMaxAggregateOutputType | null
}

export type ContactAvgAggregateOutputType = {
  userid: number
}

export type ContactSumAggregateOutputType = {
  userid: number
}

export type ContactMinAggregateOutputType = {
  userid: number
}

export type ContactMaxAggregateOutputType = {
  userid: number
}


export type ContactAvgAggregateInputType = {
  userid?: true
}

export type ContactSumAggregateInputType = {
  userid?: true
}

export type ContactMinAggregateInputType = {
  userid?: true
}

export type ContactMaxAggregateInputType = {
  userid?: true
}

export type AggregateContactArgs = {
  where?: ContactWhereInput
  orderBy?: Enumerable<ContactOrderByInput> | ContactOrderByInput
  cursor?: ContactWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<ContactDistinctFieldEnum>
  count?: true
  avg?: ContactAvgAggregateInputType
  sum?: ContactSumAggregateInputType
  min?: ContactMinAggregateInputType
  max?: ContactMaxAggregateInputType
}

export type GetContactAggregateType<T extends AggregateContactArgs> = {
  [P in keyof T]: P extends 'count' ? number : GetContactAggregateScalarType<T[P]>
}

export type GetContactAggregateScalarType<T extends any> = {
  [P in keyof T]: P extends keyof ContactAvgAggregateOutputType ? ContactAvgAggregateOutputType[P] : never
}
    
    

export type ContactSelect = {
  id?: boolean
  User?: boolean | UserArgs
  userid?: boolean
  talkto?: boolean
  phone?: boolean
  createdat?: boolean
  updatedat?: boolean
}

export type ContactInclude = {
  User?: boolean | UserArgs
}

export type ContactGetPayload<
  S extends boolean | null | undefined | ContactArgs,
  U = keyof S
> = S extends true
  ? Contact
  : S extends undefined
  ? never
  : S extends ContactArgs | FindManyContactArgs
  ? 'include' extends U
    ? Contact  & {
      [P in TrueKeys<S['include']>]:
      P extends 'User'
      ? UserGetPayload<S['include'][P]> : never
    }
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof Contact ? Contact[P]
: 
      P extends 'User'
      ? UserGetPayload<S['select'][P]> : never
    }
  : Contact
: Contact


export interface ContactDelegate {
  /**
   * Find zero or one Contact that matches the filter.
   * @param {FindOneContactArgs} args - Arguments to find a Contact
   * @example
   * // Get one Contact
   * const contact = await prisma.contact.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findOne<T extends FindOneContactArgs>(
    args: Subset<T, FindOneContactArgs>
  ): CheckSelect<T, Prisma__ContactClient<Contact | null>, Prisma__ContactClient<ContactGetPayload<T> | null>>
  /**
   * Find the first Contact that matches the filter.
   * @param {FindFirstContactArgs} args - Arguments to find a Contact
   * @example
   * // Get one Contact
   * const contact = await prisma.contact.findFirst({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findFirst<T extends FindFirstContactArgs>(
    args?: Subset<T, FindFirstContactArgs>
  ): CheckSelect<T, Prisma__ContactClient<Contact | null>, Prisma__ContactClient<ContactGetPayload<T> | null>>
  /**
   * Find zero or more Contacts that matches the filter.
   * @param {FindManyContactArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all Contacts
   * const contacts = await prisma.contact.findMany()
   * 
   * // Get first 10 Contacts
   * const contacts = await prisma.contact.findMany({ take: 10 })
   * 
   * // Only select the `id`
   * const contactWithIdOnly = await prisma.contact.findMany({ select: { id: true } })
   * 
  **/
  findMany<T extends FindManyContactArgs>(
    args?: Subset<T, FindManyContactArgs>
  ): CheckSelect<T, Promise<Array<Contact>>, Promise<Array<ContactGetPayload<T>>>>
  /**
   * Create a Contact.
   * @param {ContactCreateArgs} args - Arguments to create a Contact.
   * @example
   * // Create one Contact
   * const Contact = await prisma.contact.create({
   *   data: {
   *     // ... data to create a Contact
   *   }
   * })
   * 
  **/
  create<T extends ContactCreateArgs>(
    args: Subset<T, ContactCreateArgs>
  ): CheckSelect<T, Prisma__ContactClient<Contact>, Prisma__ContactClient<ContactGetPayload<T>>>
  /**
   * Delete a Contact.
   * @param {ContactDeleteArgs} args - Arguments to delete one Contact.
   * @example
   * // Delete one Contact
   * const Contact = await prisma.contact.delete({
   *   where: {
   *     // ... filter to delete one Contact
   *   }
   * })
   * 
  **/
  delete<T extends ContactDeleteArgs>(
    args: Subset<T, ContactDeleteArgs>
  ): CheckSelect<T, Prisma__ContactClient<Contact>, Prisma__ContactClient<ContactGetPayload<T>>>
  /**
   * Update one Contact.
   * @param {ContactUpdateArgs} args - Arguments to update one Contact.
   * @example
   * // Update one Contact
   * const contact = await prisma.contact.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  update<T extends ContactUpdateArgs>(
    args: Subset<T, ContactUpdateArgs>
  ): CheckSelect<T, Prisma__ContactClient<Contact>, Prisma__ContactClient<ContactGetPayload<T>>>
  /**
   * Delete zero or more Contacts.
   * @param {ContactDeleteManyArgs} args - Arguments to filter Contacts to delete.
   * @example
   * // Delete a few Contacts
   * const { count } = await prisma.contact.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   * 
  **/
  deleteMany<T extends ContactDeleteManyArgs>(
    args: Subset<T, ContactDeleteManyArgs>
  ): Promise<BatchPayload>
  /**
   * Update zero or more Contacts.
   * @param {ContactUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many Contacts
   * const contact = await prisma.contact.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  updateMany<T extends ContactUpdateManyArgs>(
    args: Subset<T, ContactUpdateManyArgs>
  ): Promise<BatchPayload>
  /**
   * Create or update one Contact.
   * @param {ContactUpsertArgs} args - Arguments to update or create a Contact.
   * @example
   * // Update or create a Contact
   * const contact = await prisma.contact.upsert({
   *   create: {
   *     // ... data to create a Contact
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the Contact we want to update
   *   }
   * })
  **/
  upsert<T extends ContactUpsertArgs>(
    args: Subset<T, ContactUpsertArgs>
  ): CheckSelect<T, Prisma__ContactClient<Contact>, Prisma__ContactClient<ContactGetPayload<T>>>
  /**
   * Count
   */
  count(args?: Omit<FindManyContactArgs, 'select' | 'include'>): Promise<number>

  /**
   * Aggregate
   */
  aggregate<T extends AggregateContactArgs>(args: Subset<T, AggregateContactArgs>): Promise<GetContactAggregateType<T>>
}

/**
 * The delegate class that acts as a "Promise-like" for Contact.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in 
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export declare class Prisma__ContactClient<T> implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  constructor(_dmmf: DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';

  User<T extends UserArgs = {}>(args?: Subset<T, UserArgs>): CheckSelect<T, Prisma__UserClient<User | null>, Prisma__UserClient<UserGetPayload<T> | null>>;

  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * Contact findOne
 */
export type FindOneContactArgs = {
  /**
   * Select specific fields to fetch from the Contact
  **/
  select?: ContactSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: ContactInclude | null
  /**
   * Filter, which Contact to fetch.
  **/
  where: ContactWhereUniqueInput
}


/**
 * Contact findFirst
 */
export type FindFirstContactArgs = {
  /**
   * Select specific fields to fetch from the Contact
  **/
  select?: ContactSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: ContactInclude | null
  /**
   * Filter, which Contact to fetch.
  **/
  where?: ContactWhereInput
  orderBy?: Enumerable<ContactOrderByInput> | ContactOrderByInput
  cursor?: ContactWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<ContactDistinctFieldEnum>
}


/**
 * Contact findMany
 */
export type FindManyContactArgs = {
  /**
   * Select specific fields to fetch from the Contact
  **/
  select?: ContactSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: ContactInclude | null
  /**
   * Filter, which Contacts to fetch.
  **/
  where?: ContactWhereInput
  /**
   * Determine the order of the Contacts to fetch.
  **/
  orderBy?: Enumerable<ContactOrderByInput> | ContactOrderByInput
  /**
   * Sets the position for listing Contacts.
  **/
  cursor?: ContactWhereUniqueInput
  /**
   * The number of Contacts to fetch. If negative number, it will take Contacts before the `cursor`.
  **/
  take?: number
  /**
   * Skip the first `n` Contacts.
  **/
  skip?: number
  distinct?: Enumerable<ContactDistinctFieldEnum>
}


/**
 * Contact create
 */
export type ContactCreateArgs = {
  /**
   * Select specific fields to fetch from the Contact
  **/
  select?: ContactSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: ContactInclude | null
  /**
   * The data needed to create a Contact.
  **/
  data: ContactCreateInput
}


/**
 * Contact update
 */
export type ContactUpdateArgs = {
  /**
   * Select specific fields to fetch from the Contact
  **/
  select?: ContactSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: ContactInclude | null
  /**
   * The data needed to update a Contact.
  **/
  data: ContactUpdateInput
  /**
   * Choose, which Contact to update.
  **/
  where: ContactWhereUniqueInput
}


/**
 * Contact updateMany
 */
export type ContactUpdateManyArgs = {
  data: ContactUpdateManyMutationInput
  where?: ContactWhereInput
}


/**
 * Contact upsert
 */
export type ContactUpsertArgs = {
  /**
   * Select specific fields to fetch from the Contact
  **/
  select?: ContactSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: ContactInclude | null
  /**
   * The filter to search for the Contact to update in case it exists.
  **/
  where: ContactWhereUniqueInput
  /**
   * In case the Contact found by the `where` argument doesn't exist, create a new Contact with this data.
  **/
  create: ContactCreateInput
  /**
   * In case the Contact was found with the provided `where` argument, update it with this data.
  **/
  update: ContactUpdateInput
}


/**
 * Contact delete
 */
export type ContactDeleteArgs = {
  /**
   * Select specific fields to fetch from the Contact
  **/
  select?: ContactSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: ContactInclude | null
  /**
   * Filter which Contact to delete.
  **/
  where: ContactWhereUniqueInput
}


/**
 * Contact deleteMany
 */
export type ContactDeleteManyArgs = {
  where?: ContactWhereInput
}


/**
 * Contact without action
 */
export type ContactArgs = {
  /**
   * Select specific fields to fetch from the Contact
  **/
  select?: ContactSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: ContactInclude | null
}



/**
 * Model Curriculum
 */

export type Curriculum = {
  id: string
  userid: number
  professionalprofile: string
  createdat: Date
  updatedat: Date
}


export type AggregateCurriculum = {
  count: number
  avg: CurriculumAvgAggregateOutputType | null
  sum: CurriculumSumAggregateOutputType | null
  min: CurriculumMinAggregateOutputType | null
  max: CurriculumMaxAggregateOutputType | null
}

export type CurriculumAvgAggregateOutputType = {
  userid: number
}

export type CurriculumSumAggregateOutputType = {
  userid: number
}

export type CurriculumMinAggregateOutputType = {
  userid: number
}

export type CurriculumMaxAggregateOutputType = {
  userid: number
}


export type CurriculumAvgAggregateInputType = {
  userid?: true
}

export type CurriculumSumAggregateInputType = {
  userid?: true
}

export type CurriculumMinAggregateInputType = {
  userid?: true
}

export type CurriculumMaxAggregateInputType = {
  userid?: true
}

export type AggregateCurriculumArgs = {
  where?: CurriculumWhereInput
  orderBy?: Enumerable<CurriculumOrderByInput> | CurriculumOrderByInput
  cursor?: CurriculumWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<CurriculumDistinctFieldEnum>
  count?: true
  avg?: CurriculumAvgAggregateInputType
  sum?: CurriculumSumAggregateInputType
  min?: CurriculumMinAggregateInputType
  max?: CurriculumMaxAggregateInputType
}

export type GetCurriculumAggregateType<T extends AggregateCurriculumArgs> = {
  [P in keyof T]: P extends 'count' ? number : GetCurriculumAggregateScalarType<T[P]>
}

export type GetCurriculumAggregateScalarType<T extends any> = {
  [P in keyof T]: P extends keyof CurriculumAvgAggregateOutputType ? CurriculumAvgAggregateOutputType[P] : never
}
    
    

export type CurriculumSelect = {
  id?: boolean
  User?: boolean | UserArgs
  userid?: boolean
  professionalprofile?: boolean
  createdat?: boolean
  updatedat?: boolean
}

export type CurriculumInclude = {
  User?: boolean | UserArgs
}

export type CurriculumGetPayload<
  S extends boolean | null | undefined | CurriculumArgs,
  U = keyof S
> = S extends true
  ? Curriculum
  : S extends undefined
  ? never
  : S extends CurriculumArgs | FindManyCurriculumArgs
  ? 'include' extends U
    ? Curriculum  & {
      [P in TrueKeys<S['include']>]:
      P extends 'User'
      ? UserGetPayload<S['include'][P]> : never
    }
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof Curriculum ? Curriculum[P]
: 
      P extends 'User'
      ? UserGetPayload<S['select'][P]> : never
    }
  : Curriculum
: Curriculum


export interface CurriculumDelegate {
  /**
   * Find zero or one Curriculum that matches the filter.
   * @param {FindOneCurriculumArgs} args - Arguments to find a Curriculum
   * @example
   * // Get one Curriculum
   * const curriculum = await prisma.curriculum.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findOne<T extends FindOneCurriculumArgs>(
    args: Subset<T, FindOneCurriculumArgs>
  ): CheckSelect<T, Prisma__CurriculumClient<Curriculum | null>, Prisma__CurriculumClient<CurriculumGetPayload<T> | null>>
  /**
   * Find the first Curriculum that matches the filter.
   * @param {FindFirstCurriculumArgs} args - Arguments to find a Curriculum
   * @example
   * // Get one Curriculum
   * const curriculum = await prisma.curriculum.findFirst({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findFirst<T extends FindFirstCurriculumArgs>(
    args?: Subset<T, FindFirstCurriculumArgs>
  ): CheckSelect<T, Prisma__CurriculumClient<Curriculum | null>, Prisma__CurriculumClient<CurriculumGetPayload<T> | null>>
  /**
   * Find zero or more Curricula that matches the filter.
   * @param {FindManyCurriculumArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all Curricula
   * const curricula = await prisma.curriculum.findMany()
   * 
   * // Get first 10 Curricula
   * const curricula = await prisma.curriculum.findMany({ take: 10 })
   * 
   * // Only select the `id`
   * const curriculumWithIdOnly = await prisma.curriculum.findMany({ select: { id: true } })
   * 
  **/
  findMany<T extends FindManyCurriculumArgs>(
    args?: Subset<T, FindManyCurriculumArgs>
  ): CheckSelect<T, Promise<Array<Curriculum>>, Promise<Array<CurriculumGetPayload<T>>>>
  /**
   * Create a Curriculum.
   * @param {CurriculumCreateArgs} args - Arguments to create a Curriculum.
   * @example
   * // Create one Curriculum
   * const Curriculum = await prisma.curriculum.create({
   *   data: {
   *     // ... data to create a Curriculum
   *   }
   * })
   * 
  **/
  create<T extends CurriculumCreateArgs>(
    args: Subset<T, CurriculumCreateArgs>
  ): CheckSelect<T, Prisma__CurriculumClient<Curriculum>, Prisma__CurriculumClient<CurriculumGetPayload<T>>>
  /**
   * Delete a Curriculum.
   * @param {CurriculumDeleteArgs} args - Arguments to delete one Curriculum.
   * @example
   * // Delete one Curriculum
   * const Curriculum = await prisma.curriculum.delete({
   *   where: {
   *     // ... filter to delete one Curriculum
   *   }
   * })
   * 
  **/
  delete<T extends CurriculumDeleteArgs>(
    args: Subset<T, CurriculumDeleteArgs>
  ): CheckSelect<T, Prisma__CurriculumClient<Curriculum>, Prisma__CurriculumClient<CurriculumGetPayload<T>>>
  /**
   * Update one Curriculum.
   * @param {CurriculumUpdateArgs} args - Arguments to update one Curriculum.
   * @example
   * // Update one Curriculum
   * const curriculum = await prisma.curriculum.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  update<T extends CurriculumUpdateArgs>(
    args: Subset<T, CurriculumUpdateArgs>
  ): CheckSelect<T, Prisma__CurriculumClient<Curriculum>, Prisma__CurriculumClient<CurriculumGetPayload<T>>>
  /**
   * Delete zero or more Curricula.
   * @param {CurriculumDeleteManyArgs} args - Arguments to filter Curricula to delete.
   * @example
   * // Delete a few Curricula
   * const { count } = await prisma.curriculum.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   * 
  **/
  deleteMany<T extends CurriculumDeleteManyArgs>(
    args: Subset<T, CurriculumDeleteManyArgs>
  ): Promise<BatchPayload>
  /**
   * Update zero or more Curricula.
   * @param {CurriculumUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many Curricula
   * const curriculum = await prisma.curriculum.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  updateMany<T extends CurriculumUpdateManyArgs>(
    args: Subset<T, CurriculumUpdateManyArgs>
  ): Promise<BatchPayload>
  /**
   * Create or update one Curriculum.
   * @param {CurriculumUpsertArgs} args - Arguments to update or create a Curriculum.
   * @example
   * // Update or create a Curriculum
   * const curriculum = await prisma.curriculum.upsert({
   *   create: {
   *     // ... data to create a Curriculum
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the Curriculum we want to update
   *   }
   * })
  **/
  upsert<T extends CurriculumUpsertArgs>(
    args: Subset<T, CurriculumUpsertArgs>
  ): CheckSelect<T, Prisma__CurriculumClient<Curriculum>, Prisma__CurriculumClient<CurriculumGetPayload<T>>>
  /**
   * Count
   */
  count(args?: Omit<FindManyCurriculumArgs, 'select' | 'include'>): Promise<number>

  /**
   * Aggregate
   */
  aggregate<T extends AggregateCurriculumArgs>(args: Subset<T, AggregateCurriculumArgs>): Promise<GetCurriculumAggregateType<T>>
}

/**
 * The delegate class that acts as a "Promise-like" for Curriculum.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in 
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export declare class Prisma__CurriculumClient<T> implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  constructor(_dmmf: DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';

  User<T extends UserArgs = {}>(args?: Subset<T, UserArgs>): CheckSelect<T, Prisma__UserClient<User | null>, Prisma__UserClient<UserGetPayload<T> | null>>;

  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * Curriculum findOne
 */
export type FindOneCurriculumArgs = {
  /**
   * Select specific fields to fetch from the Curriculum
  **/
  select?: CurriculumSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: CurriculumInclude | null
  /**
   * Filter, which Curriculum to fetch.
  **/
  where: CurriculumWhereUniqueInput
}


/**
 * Curriculum findFirst
 */
export type FindFirstCurriculumArgs = {
  /**
   * Select specific fields to fetch from the Curriculum
  **/
  select?: CurriculumSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: CurriculumInclude | null
  /**
   * Filter, which Curriculum to fetch.
  **/
  where?: CurriculumWhereInput
  orderBy?: Enumerable<CurriculumOrderByInput> | CurriculumOrderByInput
  cursor?: CurriculumWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<CurriculumDistinctFieldEnum>
}


/**
 * Curriculum findMany
 */
export type FindManyCurriculumArgs = {
  /**
   * Select specific fields to fetch from the Curriculum
  **/
  select?: CurriculumSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: CurriculumInclude | null
  /**
   * Filter, which Curricula to fetch.
  **/
  where?: CurriculumWhereInput
  /**
   * Determine the order of the Curricula to fetch.
  **/
  orderBy?: Enumerable<CurriculumOrderByInput> | CurriculumOrderByInput
  /**
   * Sets the position for listing Curricula.
  **/
  cursor?: CurriculumWhereUniqueInput
  /**
   * The number of Curricula to fetch. If negative number, it will take Curricula before the `cursor`.
  **/
  take?: number
  /**
   * Skip the first `n` Curricula.
  **/
  skip?: number
  distinct?: Enumerable<CurriculumDistinctFieldEnum>
}


/**
 * Curriculum create
 */
export type CurriculumCreateArgs = {
  /**
   * Select specific fields to fetch from the Curriculum
  **/
  select?: CurriculumSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: CurriculumInclude | null
  /**
   * The data needed to create a Curriculum.
  **/
  data: CurriculumCreateInput
}


/**
 * Curriculum update
 */
export type CurriculumUpdateArgs = {
  /**
   * Select specific fields to fetch from the Curriculum
  **/
  select?: CurriculumSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: CurriculumInclude | null
  /**
   * The data needed to update a Curriculum.
  **/
  data: CurriculumUpdateInput
  /**
   * Choose, which Curriculum to update.
  **/
  where: CurriculumWhereUniqueInput
}


/**
 * Curriculum updateMany
 */
export type CurriculumUpdateManyArgs = {
  data: CurriculumUpdateManyMutationInput
  where?: CurriculumWhereInput
}


/**
 * Curriculum upsert
 */
export type CurriculumUpsertArgs = {
  /**
   * Select specific fields to fetch from the Curriculum
  **/
  select?: CurriculumSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: CurriculumInclude | null
  /**
   * The filter to search for the Curriculum to update in case it exists.
  **/
  where: CurriculumWhereUniqueInput
  /**
   * In case the Curriculum found by the `where` argument doesn't exist, create a new Curriculum with this data.
  **/
  create: CurriculumCreateInput
  /**
   * In case the Curriculum was found with the provided `where` argument, update it with this data.
  **/
  update: CurriculumUpdateInput
}


/**
 * Curriculum delete
 */
export type CurriculumDeleteArgs = {
  /**
   * Select specific fields to fetch from the Curriculum
  **/
  select?: CurriculumSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: CurriculumInclude | null
  /**
   * Filter which Curriculum to delete.
  **/
  where: CurriculumWhereUniqueInput
}


/**
 * Curriculum deleteMany
 */
export type CurriculumDeleteManyArgs = {
  where?: CurriculumWhereInput
}


/**
 * Curriculum without action
 */
export type CurriculumArgs = {
  /**
   * Select specific fields to fetch from the Curriculum
  **/
  select?: CurriculumSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: CurriculumInclude | null
}



/**
 * Model Company
 */

export type Company = {
  id: string
  name: string
  registrofederal: string
  site: string | null
  links: string[]
  labellinks: string[]
  active: boolean
  role: Role
  createdat: Date
  updatedat: Date
}


export type AggregateCompany = {
  count: number
}



export type AggregateCompanyArgs = {
  where?: CompanyWhereInput
  orderBy?: Enumerable<CompanyOrderByInput> | CompanyOrderByInput
  cursor?: CompanyWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<CompanyDistinctFieldEnum>
  count?: true
}

export type GetCompanyAggregateType<T extends AggregateCompanyArgs> = {
  [P in keyof T]: P extends 'count' ? number : never
}


    
    

export type CompanySelect = {
  id?: boolean
  name?: boolean
  registrofederal?: boolean
  site?: boolean
  links?: boolean
  labellinks?: boolean
  active?: boolean
  role?: boolean
  createdat?: boolean
  updatedat?: boolean
}

export type CompanyGetPayload<
  S extends boolean | null | undefined | CompanyArgs,
  U = keyof S
> = S extends true
  ? Company
  : S extends undefined
  ? never
  : S extends CompanyArgs | FindManyCompanyArgs
  ? 'include' extends U
    ? Company 
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof Company ? Company[P]
: 
 never
    }
  : Company
: Company


export interface CompanyDelegate {
  /**
   * Find zero or one Company that matches the filter.
   * @param {FindOneCompanyArgs} args - Arguments to find a Company
   * @example
   * // Get one Company
   * const company = await prisma.company.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findOne<T extends FindOneCompanyArgs>(
    args: Subset<T, FindOneCompanyArgs>
  ): CheckSelect<T, Prisma__CompanyClient<Company | null>, Prisma__CompanyClient<CompanyGetPayload<T> | null>>
  /**
   * Find the first Company that matches the filter.
   * @param {FindFirstCompanyArgs} args - Arguments to find a Company
   * @example
   * // Get one Company
   * const company = await prisma.company.findFirst({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findFirst<T extends FindFirstCompanyArgs>(
    args?: Subset<T, FindFirstCompanyArgs>
  ): CheckSelect<T, Prisma__CompanyClient<Company | null>, Prisma__CompanyClient<CompanyGetPayload<T> | null>>
  /**
   * Find zero or more Companies that matches the filter.
   * @param {FindManyCompanyArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all Companies
   * const companies = await prisma.company.findMany()
   * 
   * // Get first 10 Companies
   * const companies = await prisma.company.findMany({ take: 10 })
   * 
   * // Only select the `id`
   * const companyWithIdOnly = await prisma.company.findMany({ select: { id: true } })
   * 
  **/
  findMany<T extends FindManyCompanyArgs>(
    args?: Subset<T, FindManyCompanyArgs>
  ): CheckSelect<T, Promise<Array<Company>>, Promise<Array<CompanyGetPayload<T>>>>
  /**
   * Create a Company.
   * @param {CompanyCreateArgs} args - Arguments to create a Company.
   * @example
   * // Create one Company
   * const Company = await prisma.company.create({
   *   data: {
   *     // ... data to create a Company
   *   }
   * })
   * 
  **/
  create<T extends CompanyCreateArgs>(
    args: Subset<T, CompanyCreateArgs>
  ): CheckSelect<T, Prisma__CompanyClient<Company>, Prisma__CompanyClient<CompanyGetPayload<T>>>
  /**
   * Delete a Company.
   * @param {CompanyDeleteArgs} args - Arguments to delete one Company.
   * @example
   * // Delete one Company
   * const Company = await prisma.company.delete({
   *   where: {
   *     // ... filter to delete one Company
   *   }
   * })
   * 
  **/
  delete<T extends CompanyDeleteArgs>(
    args: Subset<T, CompanyDeleteArgs>
  ): CheckSelect<T, Prisma__CompanyClient<Company>, Prisma__CompanyClient<CompanyGetPayload<T>>>
  /**
   * Update one Company.
   * @param {CompanyUpdateArgs} args - Arguments to update one Company.
   * @example
   * // Update one Company
   * const company = await prisma.company.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  update<T extends CompanyUpdateArgs>(
    args: Subset<T, CompanyUpdateArgs>
  ): CheckSelect<T, Prisma__CompanyClient<Company>, Prisma__CompanyClient<CompanyGetPayload<T>>>
  /**
   * Delete zero or more Companies.
   * @param {CompanyDeleteManyArgs} args - Arguments to filter Companies to delete.
   * @example
   * // Delete a few Companies
   * const { count } = await prisma.company.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   * 
  **/
  deleteMany<T extends CompanyDeleteManyArgs>(
    args: Subset<T, CompanyDeleteManyArgs>
  ): Promise<BatchPayload>
  /**
   * Update zero or more Companies.
   * @param {CompanyUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many Companies
   * const company = await prisma.company.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  updateMany<T extends CompanyUpdateManyArgs>(
    args: Subset<T, CompanyUpdateManyArgs>
  ): Promise<BatchPayload>
  /**
   * Create or update one Company.
   * @param {CompanyUpsertArgs} args - Arguments to update or create a Company.
   * @example
   * // Update or create a Company
   * const company = await prisma.company.upsert({
   *   create: {
   *     // ... data to create a Company
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the Company we want to update
   *   }
   * })
  **/
  upsert<T extends CompanyUpsertArgs>(
    args: Subset<T, CompanyUpsertArgs>
  ): CheckSelect<T, Prisma__CompanyClient<Company>, Prisma__CompanyClient<CompanyGetPayload<T>>>
  /**
   * Count
   */
  count(args?: Omit<FindManyCompanyArgs, 'select' | 'include'>): Promise<number>

  /**
   * Aggregate
   */
  aggregate<T extends AggregateCompanyArgs>(args: Subset<T, AggregateCompanyArgs>): Promise<GetCompanyAggregateType<T>>
}

/**
 * The delegate class that acts as a "Promise-like" for Company.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in 
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export declare class Prisma__CompanyClient<T> implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  constructor(_dmmf: DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';


  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * Company findOne
 */
export type FindOneCompanyArgs = {
  /**
   * Select specific fields to fetch from the Company
  **/
  select?: CompanySelect | null
  /**
   * Filter, which Company to fetch.
  **/
  where: CompanyWhereUniqueInput
}


/**
 * Company findFirst
 */
export type FindFirstCompanyArgs = {
  /**
   * Select specific fields to fetch from the Company
  **/
  select?: CompanySelect | null
  /**
   * Filter, which Company to fetch.
  **/
  where?: CompanyWhereInput
  orderBy?: Enumerable<CompanyOrderByInput> | CompanyOrderByInput
  cursor?: CompanyWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<CompanyDistinctFieldEnum>
}


/**
 * Company findMany
 */
export type FindManyCompanyArgs = {
  /**
   * Select specific fields to fetch from the Company
  **/
  select?: CompanySelect | null
  /**
   * Filter, which Companies to fetch.
  **/
  where?: CompanyWhereInput
  /**
   * Determine the order of the Companies to fetch.
  **/
  orderBy?: Enumerable<CompanyOrderByInput> | CompanyOrderByInput
  /**
   * Sets the position for listing Companies.
  **/
  cursor?: CompanyWhereUniqueInput
  /**
   * The number of Companies to fetch. If negative number, it will take Companies before the `cursor`.
  **/
  take?: number
  /**
   * Skip the first `n` Companies.
  **/
  skip?: number
  distinct?: Enumerable<CompanyDistinctFieldEnum>
}


/**
 * Company create
 */
export type CompanyCreateArgs = {
  /**
   * Select specific fields to fetch from the Company
  **/
  select?: CompanySelect | null
  /**
   * The data needed to create a Company.
  **/
  data: CompanyCreateInput
}


/**
 * Company update
 */
export type CompanyUpdateArgs = {
  /**
   * Select specific fields to fetch from the Company
  **/
  select?: CompanySelect | null
  /**
   * The data needed to update a Company.
  **/
  data: CompanyUpdateInput
  /**
   * Choose, which Company to update.
  **/
  where: CompanyWhereUniqueInput
}


/**
 * Company updateMany
 */
export type CompanyUpdateManyArgs = {
  data: CompanyUpdateManyMutationInput
  where?: CompanyWhereInput
}


/**
 * Company upsert
 */
export type CompanyUpsertArgs = {
  /**
   * Select specific fields to fetch from the Company
  **/
  select?: CompanySelect | null
  /**
   * The filter to search for the Company to update in case it exists.
  **/
  where: CompanyWhereUniqueInput
  /**
   * In case the Company found by the `where` argument doesn't exist, create a new Company with this data.
  **/
  create: CompanyCreateInput
  /**
   * In case the Company was found with the provided `where` argument, update it with this data.
  **/
  update: CompanyUpdateInput
}


/**
 * Company delete
 */
export type CompanyDeleteArgs = {
  /**
   * Select specific fields to fetch from the Company
  **/
  select?: CompanySelect | null
  /**
   * Filter which Company to delete.
  **/
  where: CompanyWhereUniqueInput
}


/**
 * Company deleteMany
 */
export type CompanyDeleteManyArgs = {
  where?: CompanyWhereInput
}


/**
 * Company without action
 */
export type CompanyArgs = {
  /**
   * Select specific fields to fetch from the Company
  **/
  select?: CompanySelect | null
}



/**
 * Model Agency
 */

export type Agency = {
  id: string
  name: string
  registrofederal: string
  site: string
  links: string[]
  labellinks: string[]
  active: boolean
  role: Role
  createdat: Date
  updatedat: Date
}


export type AggregateAgency = {
  count: number
}



export type AggregateAgencyArgs = {
  where?: AgencyWhereInput
  orderBy?: Enumerable<AgencyOrderByInput> | AgencyOrderByInput
  cursor?: AgencyWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<AgencyDistinctFieldEnum>
  count?: true
}

export type GetAgencyAggregateType<T extends AggregateAgencyArgs> = {
  [P in keyof T]: P extends 'count' ? number : never
}


    
    

export type AgencySelect = {
  id?: boolean
  name?: boolean
  registrofederal?: boolean
  site?: boolean
  links?: boolean
  labellinks?: boolean
  active?: boolean
  role?: boolean
  createdat?: boolean
  updatedat?: boolean
}

export type AgencyGetPayload<
  S extends boolean | null | undefined | AgencyArgs,
  U = keyof S
> = S extends true
  ? Agency
  : S extends undefined
  ? never
  : S extends AgencyArgs | FindManyAgencyArgs
  ? 'include' extends U
    ? Agency 
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof Agency ? Agency[P]
: 
 never
    }
  : Agency
: Agency


export interface AgencyDelegate {
  /**
   * Find zero or one Agency that matches the filter.
   * @param {FindOneAgencyArgs} args - Arguments to find a Agency
   * @example
   * // Get one Agency
   * const agency = await prisma.agency.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findOne<T extends FindOneAgencyArgs>(
    args: Subset<T, FindOneAgencyArgs>
  ): CheckSelect<T, Prisma__AgencyClient<Agency | null>, Prisma__AgencyClient<AgencyGetPayload<T> | null>>
  /**
   * Find the first Agency that matches the filter.
   * @param {FindFirstAgencyArgs} args - Arguments to find a Agency
   * @example
   * // Get one Agency
   * const agency = await prisma.agency.findFirst({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findFirst<T extends FindFirstAgencyArgs>(
    args?: Subset<T, FindFirstAgencyArgs>
  ): CheckSelect<T, Prisma__AgencyClient<Agency | null>, Prisma__AgencyClient<AgencyGetPayload<T> | null>>
  /**
   * Find zero or more Agencies that matches the filter.
   * @param {FindManyAgencyArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all Agencies
   * const agencies = await prisma.agency.findMany()
   * 
   * // Get first 10 Agencies
   * const agencies = await prisma.agency.findMany({ take: 10 })
   * 
   * // Only select the `id`
   * const agencyWithIdOnly = await prisma.agency.findMany({ select: { id: true } })
   * 
  **/
  findMany<T extends FindManyAgencyArgs>(
    args?: Subset<T, FindManyAgencyArgs>
  ): CheckSelect<T, Promise<Array<Agency>>, Promise<Array<AgencyGetPayload<T>>>>
  /**
   * Create a Agency.
   * @param {AgencyCreateArgs} args - Arguments to create a Agency.
   * @example
   * // Create one Agency
   * const Agency = await prisma.agency.create({
   *   data: {
   *     // ... data to create a Agency
   *   }
   * })
   * 
  **/
  create<T extends AgencyCreateArgs>(
    args: Subset<T, AgencyCreateArgs>
  ): CheckSelect<T, Prisma__AgencyClient<Agency>, Prisma__AgencyClient<AgencyGetPayload<T>>>
  /**
   * Delete a Agency.
   * @param {AgencyDeleteArgs} args - Arguments to delete one Agency.
   * @example
   * // Delete one Agency
   * const Agency = await prisma.agency.delete({
   *   where: {
   *     // ... filter to delete one Agency
   *   }
   * })
   * 
  **/
  delete<T extends AgencyDeleteArgs>(
    args: Subset<T, AgencyDeleteArgs>
  ): CheckSelect<T, Prisma__AgencyClient<Agency>, Prisma__AgencyClient<AgencyGetPayload<T>>>
  /**
   * Update one Agency.
   * @param {AgencyUpdateArgs} args - Arguments to update one Agency.
   * @example
   * // Update one Agency
   * const agency = await prisma.agency.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  update<T extends AgencyUpdateArgs>(
    args: Subset<T, AgencyUpdateArgs>
  ): CheckSelect<T, Prisma__AgencyClient<Agency>, Prisma__AgencyClient<AgencyGetPayload<T>>>
  /**
   * Delete zero or more Agencies.
   * @param {AgencyDeleteManyArgs} args - Arguments to filter Agencies to delete.
   * @example
   * // Delete a few Agencies
   * const { count } = await prisma.agency.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   * 
  **/
  deleteMany<T extends AgencyDeleteManyArgs>(
    args: Subset<T, AgencyDeleteManyArgs>
  ): Promise<BatchPayload>
  /**
   * Update zero or more Agencies.
   * @param {AgencyUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many Agencies
   * const agency = await prisma.agency.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  updateMany<T extends AgencyUpdateManyArgs>(
    args: Subset<T, AgencyUpdateManyArgs>
  ): Promise<BatchPayload>
  /**
   * Create or update one Agency.
   * @param {AgencyUpsertArgs} args - Arguments to update or create a Agency.
   * @example
   * // Update or create a Agency
   * const agency = await prisma.agency.upsert({
   *   create: {
   *     // ... data to create a Agency
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the Agency we want to update
   *   }
   * })
  **/
  upsert<T extends AgencyUpsertArgs>(
    args: Subset<T, AgencyUpsertArgs>
  ): CheckSelect<T, Prisma__AgencyClient<Agency>, Prisma__AgencyClient<AgencyGetPayload<T>>>
  /**
   * Count
   */
  count(args?: Omit<FindManyAgencyArgs, 'select' | 'include'>): Promise<number>

  /**
   * Aggregate
   */
  aggregate<T extends AggregateAgencyArgs>(args: Subset<T, AggregateAgencyArgs>): Promise<GetAgencyAggregateType<T>>
}

/**
 * The delegate class that acts as a "Promise-like" for Agency.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in 
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export declare class Prisma__AgencyClient<T> implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  constructor(_dmmf: DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';


  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * Agency findOne
 */
export type FindOneAgencyArgs = {
  /**
   * Select specific fields to fetch from the Agency
  **/
  select?: AgencySelect | null
  /**
   * Filter, which Agency to fetch.
  **/
  where: AgencyWhereUniqueInput
}


/**
 * Agency findFirst
 */
export type FindFirstAgencyArgs = {
  /**
   * Select specific fields to fetch from the Agency
  **/
  select?: AgencySelect | null
  /**
   * Filter, which Agency to fetch.
  **/
  where?: AgencyWhereInput
  orderBy?: Enumerable<AgencyOrderByInput> | AgencyOrderByInput
  cursor?: AgencyWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<AgencyDistinctFieldEnum>
}


/**
 * Agency findMany
 */
export type FindManyAgencyArgs = {
  /**
   * Select specific fields to fetch from the Agency
  **/
  select?: AgencySelect | null
  /**
   * Filter, which Agencies to fetch.
  **/
  where?: AgencyWhereInput
  /**
   * Determine the order of the Agencies to fetch.
  **/
  orderBy?: Enumerable<AgencyOrderByInput> | AgencyOrderByInput
  /**
   * Sets the position for listing Agencies.
  **/
  cursor?: AgencyWhereUniqueInput
  /**
   * The number of Agencies to fetch. If negative number, it will take Agencies before the `cursor`.
  **/
  take?: number
  /**
   * Skip the first `n` Agencies.
  **/
  skip?: number
  distinct?: Enumerable<AgencyDistinctFieldEnum>
}


/**
 * Agency create
 */
export type AgencyCreateArgs = {
  /**
   * Select specific fields to fetch from the Agency
  **/
  select?: AgencySelect | null
  /**
   * The data needed to create a Agency.
  **/
  data: AgencyCreateInput
}


/**
 * Agency update
 */
export type AgencyUpdateArgs = {
  /**
   * Select specific fields to fetch from the Agency
  **/
  select?: AgencySelect | null
  /**
   * The data needed to update a Agency.
  **/
  data: AgencyUpdateInput
  /**
   * Choose, which Agency to update.
  **/
  where: AgencyWhereUniqueInput
}


/**
 * Agency updateMany
 */
export type AgencyUpdateManyArgs = {
  data: AgencyUpdateManyMutationInput
  where?: AgencyWhereInput
}


/**
 * Agency upsert
 */
export type AgencyUpsertArgs = {
  /**
   * Select specific fields to fetch from the Agency
  **/
  select?: AgencySelect | null
  /**
   * The filter to search for the Agency to update in case it exists.
  **/
  where: AgencyWhereUniqueInput
  /**
   * In case the Agency found by the `where` argument doesn't exist, create a new Agency with this data.
  **/
  create: AgencyCreateInput
  /**
   * In case the Agency was found with the provided `where` argument, update it with this data.
  **/
  update: AgencyUpdateInput
}


/**
 * Agency delete
 */
export type AgencyDeleteArgs = {
  /**
   * Select specific fields to fetch from the Agency
  **/
  select?: AgencySelect | null
  /**
   * Filter which Agency to delete.
  **/
  where: AgencyWhereUniqueInput
}


/**
 * Agency deleteMany
 */
export type AgencyDeleteManyArgs = {
  where?: AgencyWhereInput
}


/**
 * Agency without action
 */
export type AgencyArgs = {
  /**
   * Select specific fields to fetch from the Agency
  **/
  select?: AgencySelect | null
}



/**
 * Deep Input Types
 */


export type ProfileWhereInput = {
  AND?: ProfileWhereInput | Enumerable<ProfileWhereInput>
  OR?: ProfileWhereInput | Enumerable<ProfileWhereInput>
  NOT?: ProfileWhereInput | Enumerable<ProfileWhereInput>
  id?: StringFilter | string
  bio?: StringNullableFilter | string | null
  pseudonym?: StringNullableFilter | string | null
  User?: UserRelationFilter | UserWhereInput
  userId?: IntFilter | number
  createdat?: DateTimeFilter | Date | string
  updatedat?: DateTimeFilter | Date | string
}

export type ProfileOrderByInput = {
  id?: SortOrder
  bio?: SortOrder
  pseudonym?: SortOrder
  userId?: SortOrder
  createdat?: SortOrder
  updatedat?: SortOrder
}

export type ProfileWhereUniqueInput = {
  id?: string
  userId?: number
}

export type UserWhereInput = {
  AND?: UserWhereInput | Enumerable<UserWhereInput>
  OR?: UserWhereInput | Enumerable<UserWhereInput>
  NOT?: UserWhereInput | Enumerable<UserWhereInput>
  id?: IntFilter | number
  authenticationkey?: StringFilter | string
  securitykey?: StringFilter | string
  fullname?: StringFilter | string
  secret?: StringNullableFilter | string | null
  active?: BoolFilter | boolean
  email?: StringFilter | string
  cpf?: StringFilter | string
  role?: EnumRoleFilter | Role
  datebirth?: StringNullableFilter | string | null
  nickname?: StringNullableFilter | string | null
  preferencialname?: StringNullableFilter | string | null
  gender?: EnumGenderFilter | Gender
  Profile?: ProfileRelationFilter | ProfileWhereInput
  Address?: AddressListRelationFilter
  Contact?: ContactListRelationFilter
  Curriculum?: CurriculumRelationFilter | CurriculumWhereInput
  createdat?: DateTimeFilter | Date | string
  updatedat?: DateTimeFilter | Date | string
}

export type UserOrderByInput = {
  id?: SortOrder
  authenticationkey?: SortOrder
  securitykey?: SortOrder
  fullname?: SortOrder
  secret?: SortOrder
  active?: SortOrder
  email?: SortOrder
  cpf?: SortOrder
  role?: SortOrder
  datebirth?: SortOrder
  nickname?: SortOrder
  preferencialname?: SortOrder
  gender?: SortOrder
  createdat?: SortOrder
  updatedat?: SortOrder
}

export type UserWhereUniqueInput = {
  id?: number
  email?: string
  cpf?: string
  nickname?: string
}

export type AddressWhereInput = {
  AND?: AddressWhereInput | Enumerable<AddressWhereInput>
  OR?: AddressWhereInput | Enumerable<AddressWhereInput>
  NOT?: AddressWhereInput | Enumerable<AddressWhereInput>
  id?: StringFilter | string
  name?: StringFilter | string
  logradouro?: StringFilter | string
  bairro?: StringFilter | string
  cidade?: StringFilter | string
  state?: StringNullableFilter | string | null
  cep?: StringFilter | string
  createdat?: DateTimeFilter | Date | string
  updatedat?: DateTimeFilter | Date | string
  User?: UserRelationFilter | UserWhereInput
  userid?: IntFilter | number
}

export type AddressOrderByInput = {
  id?: SortOrder
  name?: SortOrder
  logradouro?: SortOrder
  bairro?: SortOrder
  cidade?: SortOrder
  state?: SortOrder
  cep?: SortOrder
  createdat?: SortOrder
  updatedat?: SortOrder
  userid?: SortOrder
}

export type AddressWhereUniqueInput = {
  id?: string
}

export type ContactWhereInput = {
  AND?: ContactWhereInput | Enumerable<ContactWhereInput>
  OR?: ContactWhereInput | Enumerable<ContactWhereInput>
  NOT?: ContactWhereInput | Enumerable<ContactWhereInput>
  id?: StringFilter | string
  User?: UserRelationFilter | UserWhereInput
  userid?: IntFilter | number
  talkto?: StringFilter | string
  phone?: StringFilter | string
  createdat?: DateTimeFilter | Date | string
  updatedat?: DateTimeFilter | Date | string
}

export type ContactOrderByInput = {
  id?: SortOrder
  userid?: SortOrder
  talkto?: SortOrder
  phone?: SortOrder
  createdat?: SortOrder
  updatedat?: SortOrder
}

export type ContactWhereUniqueInput = {
  id?: string
}

export type CurriculumWhereInput = {
  AND?: CurriculumWhereInput | Enumerable<CurriculumWhereInput>
  OR?: CurriculumWhereInput | Enumerable<CurriculumWhereInput>
  NOT?: CurriculumWhereInput | Enumerable<CurriculumWhereInput>
  id?: StringFilter | string
  User?: UserRelationFilter | UserWhereInput
  userid?: IntFilter | number
  professionalprofile?: StringFilter | string
  createdat?: DateTimeFilter | Date | string
  updatedat?: DateTimeFilter | Date | string
}

export type CurriculumOrderByInput = {
  id?: SortOrder
  userid?: SortOrder
  professionalprofile?: SortOrder
  createdat?: SortOrder
  updatedat?: SortOrder
}

export type CurriculumWhereUniqueInput = {
  id?: string
}

export type CompanyWhereInput = {
  AND?: CompanyWhereInput | Enumerable<CompanyWhereInput>
  OR?: CompanyWhereInput | Enumerable<CompanyWhereInput>
  NOT?: CompanyWhereInput | Enumerable<CompanyWhereInput>
  id?: StringFilter | string
  name?: StringFilter | string
  registrofederal?: StringFilter | string
  site?: StringNullableFilter | string | null
  links?: StringNullableListFilter
  labellinks?: StringNullableListFilter
  active?: BoolFilter | boolean
  role?: EnumRoleFilter | Role
  createdat?: DateTimeFilter | Date | string
  updatedat?: DateTimeFilter | Date | string
}

export type CompanyOrderByInput = {
  id?: SortOrder
  name?: SortOrder
  registrofederal?: SortOrder
  site?: SortOrder
  links?: SortOrder
  labellinks?: SortOrder
  active?: SortOrder
  role?: SortOrder
  createdat?: SortOrder
  updatedat?: SortOrder
}

export type CompanyWhereUniqueInput = {
  id?: string
  registrofederal?: string
  site?: string
}

export type AgencyWhereInput = {
  AND?: AgencyWhereInput | Enumerable<AgencyWhereInput>
  OR?: AgencyWhereInput | Enumerable<AgencyWhereInput>
  NOT?: AgencyWhereInput | Enumerable<AgencyWhereInput>
  id?: StringFilter | string
  name?: StringFilter | string
  registrofederal?: StringFilter | string
  site?: StringFilter | string
  links?: StringNullableListFilter
  labellinks?: StringNullableListFilter
  active?: BoolFilter | boolean
  role?: EnumRoleFilter | Role
  createdat?: DateTimeFilter | Date | string
  updatedat?: DateTimeFilter | Date | string
}

export type AgencyOrderByInput = {
  id?: SortOrder
  name?: SortOrder
  registrofederal?: SortOrder
  site?: SortOrder
  links?: SortOrder
  labellinks?: SortOrder
  active?: SortOrder
  role?: SortOrder
  createdat?: SortOrder
  updatedat?: SortOrder
}

export type AgencyWhereUniqueInput = {
  id?: string
  registrofederal?: string
  site?: string
}

export type ProfileCreateInput = {
  id?: string
  bio?: string | null
  pseudonym?: string | null
  createdat?: Date | string
  updatedat?: Date | string
  User: UserCreateOneWithoutProfileInput
}

export type ProfileUpdateInput = {
  id?: string | StringFieldUpdateOperationsInput
  bio?: string | NullableStringFieldUpdateOperationsInput | null
  pseudonym?: string | NullableStringFieldUpdateOperationsInput | null
  createdat?: Date | string | DateTimeFieldUpdateOperationsInput
  updatedat?: Date | string | DateTimeFieldUpdateOperationsInput
  User?: UserUpdateOneRequiredWithoutProfileInput
}

export type ProfileUpdateManyMutationInput = {
  id?: string | StringFieldUpdateOperationsInput
  bio?: string | NullableStringFieldUpdateOperationsInput | null
  pseudonym?: string | NullableStringFieldUpdateOperationsInput | null
  createdat?: Date | string | DateTimeFieldUpdateOperationsInput
  updatedat?: Date | string | DateTimeFieldUpdateOperationsInput
}

export type UserCreateInput = {
  authenticationkey?: string
  securitykey?: string
  fullname: string
  secret?: string | null
  active?: boolean
  email: string
  cpf: string
  role?: Role
  datebirth?: string | null
  nickname?: string | null
  preferencialname?: string | null
  gender: Gender
  createdat?: Date | string
  updatedat?: Date | string
  Profile?: ProfileCreateOneWithoutUserInput
  Address?: AddressCreateManyWithoutUserInput
  Contact?: ContactCreateManyWithoutUserInput
  Curriculum?: CurriculumCreateOneWithoutUserInput
}

export type UserUpdateInput = {
  authenticationkey?: string | StringFieldUpdateOperationsInput
  securitykey?: string | StringFieldUpdateOperationsInput
  fullname?: string | StringFieldUpdateOperationsInput
  secret?: string | NullableStringFieldUpdateOperationsInput | null
  active?: boolean | BoolFieldUpdateOperationsInput
  email?: string | StringFieldUpdateOperationsInput
  cpf?: string | StringFieldUpdateOperationsInput
  role?: Role | EnumRoleFieldUpdateOperationsInput
  datebirth?: string | NullableStringFieldUpdateOperationsInput | null
  nickname?: string | NullableStringFieldUpdateOperationsInput | null
  preferencialname?: string | NullableStringFieldUpdateOperationsInput | null
  gender?: Gender | EnumGenderFieldUpdateOperationsInput
  createdat?: Date | string | DateTimeFieldUpdateOperationsInput
  updatedat?: Date | string | DateTimeFieldUpdateOperationsInput
  Profile?: ProfileUpdateOneRequiredWithoutUserInput
  Address?: AddressUpdateManyWithoutUserInput
  Contact?: ContactUpdateManyWithoutUserInput
  Curriculum?: CurriculumUpdateOneRequiredWithoutUserInput
}

export type UserUpdateManyMutationInput = {
  authenticationkey?: string | StringFieldUpdateOperationsInput
  securitykey?: string | StringFieldUpdateOperationsInput
  fullname?: string | StringFieldUpdateOperationsInput
  secret?: string | NullableStringFieldUpdateOperationsInput | null
  active?: boolean | BoolFieldUpdateOperationsInput
  email?: string | StringFieldUpdateOperationsInput
  cpf?: string | StringFieldUpdateOperationsInput
  role?: Role | EnumRoleFieldUpdateOperationsInput
  datebirth?: string | NullableStringFieldUpdateOperationsInput | null
  nickname?: string | NullableStringFieldUpdateOperationsInput | null
  preferencialname?: string | NullableStringFieldUpdateOperationsInput | null
  gender?: Gender | EnumGenderFieldUpdateOperationsInput
  createdat?: Date | string | DateTimeFieldUpdateOperationsInput
  updatedat?: Date | string | DateTimeFieldUpdateOperationsInput
}

export type AddressCreateInput = {
  id?: string
  name: string
  logradouro: string
  bairro: string
  cidade: string
  state?: string | null
  cep: string
  createdat?: Date | string
  updatedat?: Date | string
  User: UserCreateOneWithoutAddressInput
}

export type AddressUpdateInput = {
  id?: string | StringFieldUpdateOperationsInput
  name?: string | StringFieldUpdateOperationsInput
  logradouro?: string | StringFieldUpdateOperationsInput
  bairro?: string | StringFieldUpdateOperationsInput
  cidade?: string | StringFieldUpdateOperationsInput
  state?: string | NullableStringFieldUpdateOperationsInput | null
  cep?: string | StringFieldUpdateOperationsInput
  createdat?: Date | string | DateTimeFieldUpdateOperationsInput
  updatedat?: Date | string | DateTimeFieldUpdateOperationsInput
  User?: UserUpdateOneRequiredWithoutAddressInput
}

export type AddressUpdateManyMutationInput = {
  id?: string | StringFieldUpdateOperationsInput
  name?: string | StringFieldUpdateOperationsInput
  logradouro?: string | StringFieldUpdateOperationsInput
  bairro?: string | StringFieldUpdateOperationsInput
  cidade?: string | StringFieldUpdateOperationsInput
  state?: string | NullableStringFieldUpdateOperationsInput | null
  cep?: string | StringFieldUpdateOperationsInput
  createdat?: Date | string | DateTimeFieldUpdateOperationsInput
  updatedat?: Date | string | DateTimeFieldUpdateOperationsInput
}

export type ContactCreateInput = {
  id?: string
  talkto?: string
  phone: string
  createdat?: Date | string
  updatedat?: Date | string
  User: UserCreateOneWithoutContactInput
}

export type ContactUpdateInput = {
  id?: string | StringFieldUpdateOperationsInput
  talkto?: string | StringFieldUpdateOperationsInput
  phone?: string | StringFieldUpdateOperationsInput
  createdat?: Date | string | DateTimeFieldUpdateOperationsInput
  updatedat?: Date | string | DateTimeFieldUpdateOperationsInput
  User?: UserUpdateOneRequiredWithoutContactInput
}

export type ContactUpdateManyMutationInput = {
  id?: string | StringFieldUpdateOperationsInput
  talkto?: string | StringFieldUpdateOperationsInput
  phone?: string | StringFieldUpdateOperationsInput
  createdat?: Date | string | DateTimeFieldUpdateOperationsInput
  updatedat?: Date | string | DateTimeFieldUpdateOperationsInput
}

export type CurriculumCreateInput = {
  id?: string
  professionalprofile: string
  createdat?: Date | string
  updatedat?: Date | string
  User: UserCreateOneWithoutCurriculumInput
}

export type CurriculumUpdateInput = {
  id?: string | StringFieldUpdateOperationsInput
  professionalprofile?: string | StringFieldUpdateOperationsInput
  createdat?: Date | string | DateTimeFieldUpdateOperationsInput
  updatedat?: Date | string | DateTimeFieldUpdateOperationsInput
  User?: UserUpdateOneRequiredWithoutCurriculumInput
}

export type CurriculumUpdateManyMutationInput = {
  id?: string | StringFieldUpdateOperationsInput
  professionalprofile?: string | StringFieldUpdateOperationsInput
  createdat?: Date | string | DateTimeFieldUpdateOperationsInput
  updatedat?: Date | string | DateTimeFieldUpdateOperationsInput
}

export type CompanyCreateInput = {
  id?: string
  name: string
  registrofederal: string
  site?: string | null
  active?: boolean
  role?: Role
  createdat?: Date | string
  updatedat?: Date | string
  links?: CompanyCreatelinksInput | Enumerable<string>
  labellinks?: CompanyCreatelabellinksInput | Enumerable<string>
}

export type CompanyUpdateInput = {
  id?: string | StringFieldUpdateOperationsInput
  name?: string | StringFieldUpdateOperationsInput
  registrofederal?: string | StringFieldUpdateOperationsInput
  site?: string | NullableStringFieldUpdateOperationsInput | null
  active?: boolean | BoolFieldUpdateOperationsInput
  role?: Role | EnumRoleFieldUpdateOperationsInput
  createdat?: Date | string | DateTimeFieldUpdateOperationsInput
  updatedat?: Date | string | DateTimeFieldUpdateOperationsInput
  links?: CompanyUpdatelinksInput | Enumerable<string>
  labellinks?: CompanyUpdatelabellinksInput | Enumerable<string>
}

export type CompanyUpdateManyMutationInput = {
  id?: string | StringFieldUpdateOperationsInput
  name?: string | StringFieldUpdateOperationsInput
  registrofederal?: string | StringFieldUpdateOperationsInput
  site?: string | NullableStringFieldUpdateOperationsInput | null
  active?: boolean | BoolFieldUpdateOperationsInput
  role?: Role | EnumRoleFieldUpdateOperationsInput
  createdat?: Date | string | DateTimeFieldUpdateOperationsInput
  updatedat?: Date | string | DateTimeFieldUpdateOperationsInput
  links?: CompanyUpdatelinksInput | Enumerable<string>
  labellinks?: CompanyUpdatelabellinksInput | Enumerable<string>
}

export type AgencyCreateInput = {
  id?: string
  name: string
  registrofederal: string
  site: string
  active?: boolean
  role?: Role
  createdat?: Date | string
  updatedat?: Date | string
  links?: AgencyCreatelinksInput | Enumerable<string>
  labellinks?: AgencyCreatelabellinksInput | Enumerable<string>
}

export type AgencyUpdateInput = {
  id?: string | StringFieldUpdateOperationsInput
  name?: string | StringFieldUpdateOperationsInput
  registrofederal?: string | StringFieldUpdateOperationsInput
  site?: string | StringFieldUpdateOperationsInput
  active?: boolean | BoolFieldUpdateOperationsInput
  role?: Role | EnumRoleFieldUpdateOperationsInput
  createdat?: Date | string | DateTimeFieldUpdateOperationsInput
  updatedat?: Date | string | DateTimeFieldUpdateOperationsInput
  links?: AgencyUpdatelinksInput | Enumerable<string>
  labellinks?: AgencyUpdatelabellinksInput | Enumerable<string>
}

export type AgencyUpdateManyMutationInput = {
  id?: string | StringFieldUpdateOperationsInput
  name?: string | StringFieldUpdateOperationsInput
  registrofederal?: string | StringFieldUpdateOperationsInput
  site?: string | StringFieldUpdateOperationsInput
  active?: boolean | BoolFieldUpdateOperationsInput
  role?: Role | EnumRoleFieldUpdateOperationsInput
  createdat?: Date | string | DateTimeFieldUpdateOperationsInput
  updatedat?: Date | string | DateTimeFieldUpdateOperationsInput
  links?: AgencyUpdatelinksInput | Enumerable<string>
  labellinks?: AgencyUpdatelabellinksInput | Enumerable<string>
}

export type StringFilter = {
  equals?: string
  in?: Enumerable<string>
  notIn?: Enumerable<string>
  lt?: string
  lte?: string
  gt?: string
  gte?: string
  contains?: string
  startsWith?: string
  endsWith?: string
  mode?: QueryMode
  not?: string | NestedStringFilter
}

export type StringNullableFilter = {
  equals?: string | null
  in?: Enumerable<string> | null
  notIn?: Enumerable<string> | null
  lt?: string
  lte?: string
  gt?: string
  gte?: string
  contains?: string
  startsWith?: string
  endsWith?: string
  mode?: QueryMode
  not?: string | NestedStringNullableFilter | null
}

export type UserRelationFilter = {
  is?: UserWhereInput
  isNot?: UserWhereInput
}

export type IntFilter = {
  equals?: number
  in?: Enumerable<number>
  notIn?: Enumerable<number>
  lt?: number
  lte?: number
  gt?: number
  gte?: number
  not?: number | NestedIntFilter
}

export type DateTimeFilter = {
  equals?: Date | string
  in?: Enumerable<Date> | Enumerable<string>
  notIn?: Enumerable<Date> | Enumerable<string>
  lt?: Date | string
  lte?: Date | string
  gt?: Date | string
  gte?: Date | string
  not?: Date | string | NestedDateTimeFilter
}

export type BoolFilter = {
  equals?: boolean
  not?: boolean | NestedBoolFilter
}

export type EnumRoleFilter = {
  equals?: Role
  in?: Enumerable<Role>
  notIn?: Enumerable<Role>
  not?: Role | NestedEnumRoleFilter
}

export type EnumGenderFilter = {
  equals?: Gender
  in?: Enumerable<Gender>
  notIn?: Enumerable<Gender>
  not?: Gender | NestedEnumGenderFilter
}

export type ProfileRelationFilter = {
  is?: ProfileWhereInput
  isNot?: ProfileWhereInput
}

export type AddressListRelationFilter = {
  every?: AddressWhereInput
  some?: AddressWhereInput
  none?: AddressWhereInput
}

export type ContactListRelationFilter = {
  every?: ContactWhereInput
  some?: ContactWhereInput
  none?: ContactWhereInput
}

export type CurriculumRelationFilter = {
  is?: CurriculumWhereInput
  isNot?: CurriculumWhereInput
}

export type StringNullableListFilter = {
  equals?: Enumerable<string> | null
}

export type UserCreateOneWithoutProfileInput = {
  create?: UserCreateWithoutProfileInput
  connect?: UserWhereUniqueInput
}

export type StringFieldUpdateOperationsInput = {
  set?: string
}

export type NullableStringFieldUpdateOperationsInput = {
  set?: string | null
}

export type DateTimeFieldUpdateOperationsInput = {
  set?: Date | string
}

export type UserUpdateOneRequiredWithoutProfileInput = {
  create?: UserCreateWithoutProfileInput
  connect?: UserWhereUniqueInput
  update?: UserUpdateWithoutProfileDataInput
  upsert?: UserUpsertWithoutProfileInput
}

export type ProfileCreateOneWithoutUserInput = {
  create?: ProfileCreateWithoutUserInput
  connect?: ProfileWhereUniqueInput
}

export type AddressCreateManyWithoutUserInput = {
  create?: AddressCreateWithoutUserInput | Enumerable<AddressCreateWithoutUserInput>
  connect?: AddressWhereUniqueInput | Enumerable<AddressWhereUniqueInput>
}

export type ContactCreateManyWithoutUserInput = {
  create?: ContactCreateWithoutUserInput | Enumerable<ContactCreateWithoutUserInput>
  connect?: ContactWhereUniqueInput | Enumerable<ContactWhereUniqueInput>
}

export type CurriculumCreateOneWithoutUserInput = {
  create?: CurriculumCreateWithoutUserInput
  connect?: CurriculumWhereUniqueInput
}

export type BoolFieldUpdateOperationsInput = {
  set?: boolean
}

export type EnumRoleFieldUpdateOperationsInput = {
  set?: Role
}

export type EnumGenderFieldUpdateOperationsInput = {
  set?: Gender
}

export type ProfileUpdateOneRequiredWithoutUserInput = {
  create?: ProfileCreateWithoutUserInput
  connect?: ProfileWhereUniqueInput
  update?: ProfileUpdateWithoutUserDataInput
  upsert?: ProfileUpsertWithoutUserInput
}

export type AddressUpdateManyWithoutUserInput = {
  create?: AddressCreateWithoutUserInput | Enumerable<AddressCreateWithoutUserInput>
  connect?: AddressWhereUniqueInput | Enumerable<AddressWhereUniqueInput>
  set?: AddressWhereUniqueInput | Enumerable<AddressWhereUniqueInput>
  disconnect?: AddressWhereUniqueInput | Enumerable<AddressWhereUniqueInput>
  delete?: AddressWhereUniqueInput | Enumerable<AddressWhereUniqueInput>
  update?: AddressUpdateWithWhereUniqueWithoutUserInput | Enumerable<AddressUpdateWithWhereUniqueWithoutUserInput>
  updateMany?: AddressUpdateManyWithWhereNestedInput | Enumerable<AddressUpdateManyWithWhereNestedInput>
  deleteMany?: AddressScalarWhereInput | Enumerable<AddressScalarWhereInput>
  upsert?: AddressUpsertWithWhereUniqueWithoutUserInput | Enumerable<AddressUpsertWithWhereUniqueWithoutUserInput>
}

export type ContactUpdateManyWithoutUserInput = {
  create?: ContactCreateWithoutUserInput | Enumerable<ContactCreateWithoutUserInput>
  connect?: ContactWhereUniqueInput | Enumerable<ContactWhereUniqueInput>
  set?: ContactWhereUniqueInput | Enumerable<ContactWhereUniqueInput>
  disconnect?: ContactWhereUniqueInput | Enumerable<ContactWhereUniqueInput>
  delete?: ContactWhereUniqueInput | Enumerable<ContactWhereUniqueInput>
  update?: ContactUpdateWithWhereUniqueWithoutUserInput | Enumerable<ContactUpdateWithWhereUniqueWithoutUserInput>
  updateMany?: ContactUpdateManyWithWhereNestedInput | Enumerable<ContactUpdateManyWithWhereNestedInput>
  deleteMany?: ContactScalarWhereInput | Enumerable<ContactScalarWhereInput>
  upsert?: ContactUpsertWithWhereUniqueWithoutUserInput | Enumerable<ContactUpsertWithWhereUniqueWithoutUserInput>
}

export type CurriculumUpdateOneRequiredWithoutUserInput = {
  create?: CurriculumCreateWithoutUserInput
  connect?: CurriculumWhereUniqueInput
  update?: CurriculumUpdateWithoutUserDataInput
  upsert?: CurriculumUpsertWithoutUserInput
}

export type UserCreateOneWithoutAddressInput = {
  create?: UserCreateWithoutAddressInput
  connect?: UserWhereUniqueInput
}

export type UserUpdateOneRequiredWithoutAddressInput = {
  create?: UserCreateWithoutAddressInput
  connect?: UserWhereUniqueInput
  update?: UserUpdateWithoutAddressDataInput
  upsert?: UserUpsertWithoutAddressInput
}

export type UserCreateOneWithoutContactInput = {
  create?: UserCreateWithoutContactInput
  connect?: UserWhereUniqueInput
}

export type UserUpdateOneRequiredWithoutContactInput = {
  create?: UserCreateWithoutContactInput
  connect?: UserWhereUniqueInput
  update?: UserUpdateWithoutContactDataInput
  upsert?: UserUpsertWithoutContactInput
}

export type UserCreateOneWithoutCurriculumInput = {
  create?: UserCreateWithoutCurriculumInput
  connect?: UserWhereUniqueInput
}

export type UserUpdateOneRequiredWithoutCurriculumInput = {
  create?: UserCreateWithoutCurriculumInput
  connect?: UserWhereUniqueInput
  update?: UserUpdateWithoutCurriculumDataInput
  upsert?: UserUpsertWithoutCurriculumInput
}

export type CompanyCreatelinksInput = {
  set: Enumerable<string>
}

export type CompanyCreatelabellinksInput = {
  set: Enumerable<string>
}

export type CompanyUpdatelinksInput = {
  set: Enumerable<string>
}

export type CompanyUpdatelabellinksInput = {
  set: Enumerable<string>
}

export type AgencyCreatelinksInput = {
  set: Enumerable<string>
}

export type AgencyCreatelabellinksInput = {
  set: Enumerable<string>
}

export type AgencyUpdatelinksInput = {
  set: Enumerable<string>
}

export type AgencyUpdatelabellinksInput = {
  set: Enumerable<string>
}

export type NestedStringFilter = {
  equals?: string
  in?: Enumerable<string>
  notIn?: Enumerable<string>
  lt?: string
  lte?: string
  gt?: string
  gte?: string
  contains?: string
  startsWith?: string
  endsWith?: string
  not?: string | NestedStringFilter
}

export type NestedStringNullableFilter = {
  equals?: string | null
  in?: Enumerable<string> | null
  notIn?: Enumerable<string> | null
  lt?: string
  lte?: string
  gt?: string
  gte?: string
  contains?: string
  startsWith?: string
  endsWith?: string
  not?: string | NestedStringNullableFilter | null
}

export type NestedIntFilter = {
  equals?: number
  in?: Enumerable<number>
  notIn?: Enumerable<number>
  lt?: number
  lte?: number
  gt?: number
  gte?: number
  not?: number | NestedIntFilter
}

export type NestedDateTimeFilter = {
  equals?: Date | string
  in?: Enumerable<Date> | Enumerable<string>
  notIn?: Enumerable<Date> | Enumerable<string>
  lt?: Date | string
  lte?: Date | string
  gt?: Date | string
  gte?: Date | string
  not?: Date | string | NestedDateTimeFilter
}

export type NestedBoolFilter = {
  equals?: boolean
  not?: boolean | NestedBoolFilter
}

export type NestedEnumRoleFilter = {
  equals?: Role
  in?: Enumerable<Role>
  notIn?: Enumerable<Role>
  not?: Role | NestedEnumRoleFilter
}

export type NestedEnumGenderFilter = {
  equals?: Gender
  in?: Enumerable<Gender>
  notIn?: Enumerable<Gender>
  not?: Gender | NestedEnumGenderFilter
}

export type UserCreateWithoutProfileInput = {
  authenticationkey?: string
  securitykey?: string
  fullname: string
  secret?: string | null
  active?: boolean
  email: string
  cpf: string
  role?: Role
  datebirth?: string | null
  nickname?: string | null
  preferencialname?: string | null
  gender: Gender
  createdat?: Date | string
  updatedat?: Date | string
  Address?: AddressCreateManyWithoutUserInput
  Contact?: ContactCreateManyWithoutUserInput
  Curriculum?: CurriculumCreateOneWithoutUserInput
}

export type UserUpdateWithoutProfileDataInput = {
  authenticationkey?: string | StringFieldUpdateOperationsInput
  securitykey?: string | StringFieldUpdateOperationsInput
  fullname?: string | StringFieldUpdateOperationsInput
  secret?: string | NullableStringFieldUpdateOperationsInput | null
  active?: boolean | BoolFieldUpdateOperationsInput
  email?: string | StringFieldUpdateOperationsInput
  cpf?: string | StringFieldUpdateOperationsInput
  role?: Role | EnumRoleFieldUpdateOperationsInput
  datebirth?: string | NullableStringFieldUpdateOperationsInput | null
  nickname?: string | NullableStringFieldUpdateOperationsInput | null
  preferencialname?: string | NullableStringFieldUpdateOperationsInput | null
  gender?: Gender | EnumGenderFieldUpdateOperationsInput
  createdat?: Date | string | DateTimeFieldUpdateOperationsInput
  updatedat?: Date | string | DateTimeFieldUpdateOperationsInput
  Address?: AddressUpdateManyWithoutUserInput
  Contact?: ContactUpdateManyWithoutUserInput
  Curriculum?: CurriculumUpdateOneRequiredWithoutUserInput
}

export type UserUpsertWithoutProfileInput = {
  update: UserUpdateWithoutProfileDataInput
  create: UserCreateWithoutProfileInput
}

export type ProfileCreateWithoutUserInput = {
  id?: string
  bio?: string | null
  pseudonym?: string | null
  createdat?: Date | string
  updatedat?: Date | string
}

export type AddressCreateWithoutUserInput = {
  id?: string
  name: string
  logradouro: string
  bairro: string
  cidade: string
  state?: string | null
  cep: string
  createdat?: Date | string
  updatedat?: Date | string
}

export type ContactCreateWithoutUserInput = {
  id?: string
  talkto?: string
  phone: string
  createdat?: Date | string
  updatedat?: Date | string
}

export type CurriculumCreateWithoutUserInput = {
  id?: string
  professionalprofile: string
  createdat?: Date | string
  updatedat?: Date | string
}

export type ProfileUpdateWithoutUserDataInput = {
  id?: string | StringFieldUpdateOperationsInput
  bio?: string | NullableStringFieldUpdateOperationsInput | null
  pseudonym?: string | NullableStringFieldUpdateOperationsInput | null
  createdat?: Date | string | DateTimeFieldUpdateOperationsInput
  updatedat?: Date | string | DateTimeFieldUpdateOperationsInput
}

export type ProfileUpsertWithoutUserInput = {
  update: ProfileUpdateWithoutUserDataInput
  create: ProfileCreateWithoutUserInput
}

export type AddressUpdateWithWhereUniqueWithoutUserInput = {
  where: AddressWhereUniqueInput
  data: AddressUpdateWithoutUserDataInput
}

export type AddressUpdateManyWithWhereNestedInput = {
  where: AddressScalarWhereInput
  data: AddressUpdateManyDataInput
}

export type AddressScalarWhereInput = {
  AND?: AddressScalarWhereInput | Enumerable<AddressScalarWhereInput>
  OR?: AddressScalarWhereInput | Enumerable<AddressScalarWhereInput>
  NOT?: AddressScalarWhereInput | Enumerable<AddressScalarWhereInput>
  id?: StringFilter | string
  name?: StringFilter | string
  logradouro?: StringFilter | string
  bairro?: StringFilter | string
  cidade?: StringFilter | string
  state?: StringNullableFilter | string | null
  cep?: StringFilter | string
  createdat?: DateTimeFilter | Date | string
  updatedat?: DateTimeFilter | Date | string
  userid?: IntFilter | number
}

export type AddressUpsertWithWhereUniqueWithoutUserInput = {
  where: AddressWhereUniqueInput
  update: AddressUpdateWithoutUserDataInput
  create: AddressCreateWithoutUserInput
}

export type ContactUpdateWithWhereUniqueWithoutUserInput = {
  where: ContactWhereUniqueInput
  data: ContactUpdateWithoutUserDataInput
}

export type ContactUpdateManyWithWhereNestedInput = {
  where: ContactScalarWhereInput
  data: ContactUpdateManyDataInput
}

export type ContactScalarWhereInput = {
  AND?: ContactScalarWhereInput | Enumerable<ContactScalarWhereInput>
  OR?: ContactScalarWhereInput | Enumerable<ContactScalarWhereInput>
  NOT?: ContactScalarWhereInput | Enumerable<ContactScalarWhereInput>
  id?: StringFilter | string
  userid?: IntFilter | number
  talkto?: StringFilter | string
  phone?: StringFilter | string
  createdat?: DateTimeFilter | Date | string
  updatedat?: DateTimeFilter | Date | string
}

export type ContactUpsertWithWhereUniqueWithoutUserInput = {
  where: ContactWhereUniqueInput
  update: ContactUpdateWithoutUserDataInput
  create: ContactCreateWithoutUserInput
}

export type CurriculumUpdateWithoutUserDataInput = {
  id?: string | StringFieldUpdateOperationsInput
  professionalprofile?: string | StringFieldUpdateOperationsInput
  createdat?: Date | string | DateTimeFieldUpdateOperationsInput
  updatedat?: Date | string | DateTimeFieldUpdateOperationsInput
}

export type CurriculumUpsertWithoutUserInput = {
  update: CurriculumUpdateWithoutUserDataInput
  create: CurriculumCreateWithoutUserInput
}

export type UserCreateWithoutAddressInput = {
  authenticationkey?: string
  securitykey?: string
  fullname: string
  secret?: string | null
  active?: boolean
  email: string
  cpf: string
  role?: Role
  datebirth?: string | null
  nickname?: string | null
  preferencialname?: string | null
  gender: Gender
  createdat?: Date | string
  updatedat?: Date | string
  Profile?: ProfileCreateOneWithoutUserInput
  Contact?: ContactCreateManyWithoutUserInput
  Curriculum?: CurriculumCreateOneWithoutUserInput
}

export type UserUpdateWithoutAddressDataInput = {
  authenticationkey?: string | StringFieldUpdateOperationsInput
  securitykey?: string | StringFieldUpdateOperationsInput
  fullname?: string | StringFieldUpdateOperationsInput
  secret?: string | NullableStringFieldUpdateOperationsInput | null
  active?: boolean | BoolFieldUpdateOperationsInput
  email?: string | StringFieldUpdateOperationsInput
  cpf?: string | StringFieldUpdateOperationsInput
  role?: Role | EnumRoleFieldUpdateOperationsInput
  datebirth?: string | NullableStringFieldUpdateOperationsInput | null
  nickname?: string | NullableStringFieldUpdateOperationsInput | null
  preferencialname?: string | NullableStringFieldUpdateOperationsInput | null
  gender?: Gender | EnumGenderFieldUpdateOperationsInput
  createdat?: Date | string | DateTimeFieldUpdateOperationsInput
  updatedat?: Date | string | DateTimeFieldUpdateOperationsInput
  Profile?: ProfileUpdateOneRequiredWithoutUserInput
  Contact?: ContactUpdateManyWithoutUserInput
  Curriculum?: CurriculumUpdateOneRequiredWithoutUserInput
}

export type UserUpsertWithoutAddressInput = {
  update: UserUpdateWithoutAddressDataInput
  create: UserCreateWithoutAddressInput
}

export type UserCreateWithoutContactInput = {
  authenticationkey?: string
  securitykey?: string
  fullname: string
  secret?: string | null
  active?: boolean
  email: string
  cpf: string
  role?: Role
  datebirth?: string | null
  nickname?: string | null
  preferencialname?: string | null
  gender: Gender
  createdat?: Date | string
  updatedat?: Date | string
  Profile?: ProfileCreateOneWithoutUserInput
  Address?: AddressCreateManyWithoutUserInput
  Curriculum?: CurriculumCreateOneWithoutUserInput
}

export type UserUpdateWithoutContactDataInput = {
  authenticationkey?: string | StringFieldUpdateOperationsInput
  securitykey?: string | StringFieldUpdateOperationsInput
  fullname?: string | StringFieldUpdateOperationsInput
  secret?: string | NullableStringFieldUpdateOperationsInput | null
  active?: boolean | BoolFieldUpdateOperationsInput
  email?: string | StringFieldUpdateOperationsInput
  cpf?: string | StringFieldUpdateOperationsInput
  role?: Role | EnumRoleFieldUpdateOperationsInput
  datebirth?: string | NullableStringFieldUpdateOperationsInput | null
  nickname?: string | NullableStringFieldUpdateOperationsInput | null
  preferencialname?: string | NullableStringFieldUpdateOperationsInput | null
  gender?: Gender | EnumGenderFieldUpdateOperationsInput
  createdat?: Date | string | DateTimeFieldUpdateOperationsInput
  updatedat?: Date | string | DateTimeFieldUpdateOperationsInput
  Profile?: ProfileUpdateOneRequiredWithoutUserInput
  Address?: AddressUpdateManyWithoutUserInput
  Curriculum?: CurriculumUpdateOneRequiredWithoutUserInput
}

export type UserUpsertWithoutContactInput = {
  update: UserUpdateWithoutContactDataInput
  create: UserCreateWithoutContactInput
}

export type UserCreateWithoutCurriculumInput = {
  authenticationkey?: string
  securitykey?: string
  fullname: string
  secret?: string | null
  active?: boolean
  email: string
  cpf: string
  role?: Role
  datebirth?: string | null
  nickname?: string | null
  preferencialname?: string | null
  gender: Gender
  createdat?: Date | string
  updatedat?: Date | string
  Profile?: ProfileCreateOneWithoutUserInput
  Address?: AddressCreateManyWithoutUserInput
  Contact?: ContactCreateManyWithoutUserInput
}

export type UserUpdateWithoutCurriculumDataInput = {
  authenticationkey?: string | StringFieldUpdateOperationsInput
  securitykey?: string | StringFieldUpdateOperationsInput
  fullname?: string | StringFieldUpdateOperationsInput
  secret?: string | NullableStringFieldUpdateOperationsInput | null
  active?: boolean | BoolFieldUpdateOperationsInput
  email?: string | StringFieldUpdateOperationsInput
  cpf?: string | StringFieldUpdateOperationsInput
  role?: Role | EnumRoleFieldUpdateOperationsInput
  datebirth?: string | NullableStringFieldUpdateOperationsInput | null
  nickname?: string | NullableStringFieldUpdateOperationsInput | null
  preferencialname?: string | NullableStringFieldUpdateOperationsInput | null
  gender?: Gender | EnumGenderFieldUpdateOperationsInput
  createdat?: Date | string | DateTimeFieldUpdateOperationsInput
  updatedat?: Date | string | DateTimeFieldUpdateOperationsInput
  Profile?: ProfileUpdateOneRequiredWithoutUserInput
  Address?: AddressUpdateManyWithoutUserInput
  Contact?: ContactUpdateManyWithoutUserInput
}

export type UserUpsertWithoutCurriculumInput = {
  update: UserUpdateWithoutCurriculumDataInput
  create: UserCreateWithoutCurriculumInput
}

export type AddressUpdateWithoutUserDataInput = {
  id?: string | StringFieldUpdateOperationsInput
  name?: string | StringFieldUpdateOperationsInput
  logradouro?: string | StringFieldUpdateOperationsInput
  bairro?: string | StringFieldUpdateOperationsInput
  cidade?: string | StringFieldUpdateOperationsInput
  state?: string | NullableStringFieldUpdateOperationsInput | null
  cep?: string | StringFieldUpdateOperationsInput
  createdat?: Date | string | DateTimeFieldUpdateOperationsInput
  updatedat?: Date | string | DateTimeFieldUpdateOperationsInput
}

export type AddressUpdateManyDataInput = {
  id?: string | StringFieldUpdateOperationsInput
  name?: string | StringFieldUpdateOperationsInput
  logradouro?: string | StringFieldUpdateOperationsInput
  bairro?: string | StringFieldUpdateOperationsInput
  cidade?: string | StringFieldUpdateOperationsInput
  state?: string | NullableStringFieldUpdateOperationsInput | null
  cep?: string | StringFieldUpdateOperationsInput
  createdat?: Date | string | DateTimeFieldUpdateOperationsInput
  updatedat?: Date | string | DateTimeFieldUpdateOperationsInput
}

export type ContactUpdateWithoutUserDataInput = {
  id?: string | StringFieldUpdateOperationsInput
  talkto?: string | StringFieldUpdateOperationsInput
  phone?: string | StringFieldUpdateOperationsInput
  createdat?: Date | string | DateTimeFieldUpdateOperationsInput
  updatedat?: Date | string | DateTimeFieldUpdateOperationsInput
}

export type ContactUpdateManyDataInput = {
  id?: string | StringFieldUpdateOperationsInput
  talkto?: string | StringFieldUpdateOperationsInput
  phone?: string | StringFieldUpdateOperationsInput
  createdat?: Date | string | DateTimeFieldUpdateOperationsInput
  updatedat?: Date | string | DateTimeFieldUpdateOperationsInput
}

/**
 * Batch Payload for updateMany & deleteMany
 */

export type BatchPayload = {
  count: number
}

/**
 * DMMF
 */
export declare const dmmf: DMMF.Document;
export {};
