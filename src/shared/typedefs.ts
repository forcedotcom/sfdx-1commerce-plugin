interface Record {
  Id: string;
}

interface QueryResult {
  totalSize: number;
  done: boolean;
  records: Record[];
}

export { Record, QueryResult };
