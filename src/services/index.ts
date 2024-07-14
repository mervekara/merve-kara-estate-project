import { AirtableError } from "@/utils/errors";
import Airtable, { FieldSet, RecordData } from "airtable";

// Initialize Airtable base
const base = new Airtable({
  apiKey: process.env.VUE_APP_AIRTABLE_API_TOKEN,
}).base(process.env.VUE_APP_AIRTABLE_BASE_ID);

export const fetchData = async (tableName: string): Promise<any[]> => {
  const data: Array<FieldSet> = [];

  try {
    await base(tableName)
      .select()
      .eachPage((records, fetchNextPage) => {
        records.forEach((record) => {
          data.push({
            id: record.id,
            ...record.fields,
          });
        });
        fetchNextPage();
      });

    return data;
  } catch (error) {
    throw new AirtableError(`Failed to fetch data from ${tableName}`, error);
  }
};

// Function to fetch a single record from Airtable
export const fetchAppointment = async (
  tableName: string,
  recordId: string
): Promise<RecordData<FieldSet>> => {
  try {
    const record = await base(tableName).find(recordId);

    return {
      id: record.id,
      ...record.fields,
    } as RecordData<FieldSet>;
  } catch (error) {
    throw new AirtableError(
      `Failed to fetch appointment with ID ${recordId} from ${tableName}`,
      error
    );
  }
};

// Function to create a new record in Airtable
export const createAppointment = async (
  tableName: string,
  fields: FieldSet
): Promise<RecordData<FieldSet>> => {
  try {
    const createdRecords = await base(tableName).create([{ fields }]);
    const createdRecord = createdRecords[0];

    if (!createdRecord) {
      throw new AirtableError(`Failed to create appointment in ${tableName}`);
    }

    return {
      id: createdRecord.id,
      ...createdRecord.fields,
    } as RecordData<FieldSet>;
  } catch (error) {
    throw new AirtableError(
      `Failed to create appointment in ${tableName}`,
      error
    );
  }
};

// Function to update an existing record in Airtable
export const updateAppointment = async (
  id: string,
  tableName: string,
  fields: FieldSet
): Promise<RecordData<FieldSet>> => {
  try {
    const updatedRecords = await base(tableName).update([{ id, fields }]);
    const updatedRecord = updatedRecords[0];

    if (!updatedRecord) {
      throw new AirtableError(`Failed to update appointment with ID ${id}`);
    }

    return {
      id: updatedRecord.id,
      fields: updatedRecord.fields,
    };
  } catch (error) {
    throw new AirtableError(
      `Failed to update appointment with ID ${id}`,
      error
    );
  }
};
