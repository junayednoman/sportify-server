import { FilterQuery, Query } from 'mongoose';

class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;

  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }

  search(searchableFields: string[]) {
    const searchTerm = this.query.searchTerm;
    if (searchTerm) {
      this.modelQuery = this.modelQuery.find({
        $or: searchableFields.map(
          (field) =>
            ({
              [field]: { $regex: searchTerm, $options: 'i' },
            }) as FilterQuery<T>,
        ),
      });
    }
    return this;
  }

  filter() {
    const filterQueryObj = { ...this.query };
    // filter query
    const excludeFields = ['searchTerm', 'sort', 'limit', 'pages', 'fields'];
    excludeFields.forEach((field) => {
      delete filterQueryObj[field];
    });

    this.modelQuery = this.modelQuery.find(filterQueryObj as FilterQuery<T>);
    return this;
  }

  sort() {
    const sort = this?.query?.sort || 'createdAt';
    this.modelQuery = this?.modelQuery?.sort(sort as string);
    return this;
  }

  paginate() {
    const pages = Number(this?.query?.pages) || 1;
    const limit = Number(this?.query?.limit) || 10;
    const skip = (pages - 1) * limit || 0;

    this.modelQuery = this.modelQuery.skip(skip).limit(limit);
    return this;
  }

  fields() {
    const fields =
      (this?.query?.fields as string)?.split(',').join(' ') || '-__v';
    this.modelQuery = this.modelQuery.select(fields);
    return this;
  }
}

export default QueryBuilder;