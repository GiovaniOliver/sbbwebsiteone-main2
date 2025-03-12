import { camelCase, snakeCase } from './string-utils';

type DateFields = 'createdAt' | 'updatedAt' | 'publishedAt' | 'completedAt' | 'enrolledAt' | 'issuedAt' | 'startDate' | 'endDate' | 'date' | 'generatedAt';
type JsonFields = 'metadata' | 'data';

type MapperConfig<T extends Record<string, any>> = {
  dateFields?: Array<keyof T>;
  jsonFields?: Array<keyof T>;
  customMappings?: Partial<Record<keyof T, (value: any) => any>>;
};

/**
 * Generic mapper function to convert database entities to DTOs
 * @param dbEntity The database entity to convert
 * @param config Optional configuration for special field handling
 */
export function mapToDto<T extends Record<string, any>>(
  dbEntity: Record<string, any>,
  config: MapperConfig<T> = {}
): T {
  const result: Record<string, any> = {};
  const {
    dateFields = [],
    jsonFields = [],
    customMappings = {} as Partial<Record<keyof T, (value: any) => any>>
  } = config;

  // Process each field in the database entity
  for (const [key, value] of Object.entries(dbEntity)) {
    if (value === undefined) continue;

    // Convert snake_case to camelCase for the new key
    const newKey = camelCase(key);
    const mappingKey = newKey as keyof T;

    // Apply custom mapping if provided
    if (mappingKey in customMappings && customMappings[mappingKey]) {
      result[newKey] = customMappings[mappingKey]!(value);
      continue;
    }

    // Handle date fields
    if (
      dateFields.includes(newKey as keyof T) ||
      (typeof value === 'string' && isDateField(newKey))
    ) {
      result[newKey] = value ? new Date(value) : null;
      continue;
    }

    // Handle JSON fields
    if (
      jsonFields.includes(newKey as keyof T) ||
      (typeof value === 'string' && isJsonField(newKey))
    ) {
      result[newKey] = value ? JSON.parse(value) : null;
      continue;
    }

    // Handle boolean fields with 'is' prefix
    if (newKey.startsWith('is') && typeof value === 'boolean') {
      result[newKey] = value;
      continue;
    }

    // Default assignment
    result[newKey] = value;
  }

  return result as T;
}

/**
 * Generic mapper function to convert DTOs back to database entities
 * @param dto The DTO to convert
 * @param config Optional configuration for special field handling
 */
export function mapToDb<T extends Record<string, any>>(
  dto: Record<string, any>,
  config: MapperConfig<T> = {}
): T {
  const result: Record<string, any> = {};
  const {
    jsonFields = [],
    customMappings = {} as Partial<Record<keyof T, (value: any) => any>>
  } = config;

  // Process each field in the DTO
  for (const [key, value] of Object.entries(dto)) {
    if (value === undefined) continue;

    // Convert camelCase to snake_case for the new key
    const newKey = snakeCase(key);
    const mappingKey = key as keyof T;

    // Apply custom mapping if provided
    if (mappingKey in customMappings && customMappings[mappingKey]) {
      result[newKey] = customMappings[mappingKey]!(value);
      continue;
    }

    // Handle JSON fields
    if (
      jsonFields.includes(key as keyof T) ||
      (value && isJsonField(key))
    ) {
      result[newKey] = value ? JSON.stringify(value) : null;
      continue;
    }

    // Default assignment
    result[newKey] = value;
  }

  return result as T;
}

function isDateField(key: string): boolean {
  const dateFields: DateFields[] = [
    'createdAt',
    'updatedAt',
    'publishedAt',
    'completedAt',
    'enrolledAt',
    'issuedAt',
    'startDate',
    'endDate',
    'date',
    'generatedAt'
  ];
  return dateFields.includes(key as DateFields);
}

function isJsonField(key: string): boolean {
  const jsonFields: JsonFields[] = ['metadata', 'data'];
  return jsonFields.includes(key as JsonFields);
} 