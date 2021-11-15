/* eslint-disable class-methods-use-this */
/* eslint-disable max-classes-per-file */

class Failure<T, E> {
  public constructor(public readonly error: E) {}

  public isError(): this is Failure<T, E> {
    return true;
  }
}

class Success<T, E> {
  public constructor(public readonly value: T) {}

  public isError(): this is Failure<T, E> {
    return false;
  }
}

export type TFailable<T, E> = Success<T, E> | Failure<T, E>;
const success = <T, E>(value: T): Success<T, E> => new Success(value);
const fail = <T, E>(error: E): Failure<T, E> => new Failure(error);
export interface IFailableFactory {
  success<T>(value: T): Success<T, any>;
  fail<E>(error: E): Failure<any, E>;
}
export const failableFactory = { success, fail };
