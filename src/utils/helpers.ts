export interface MyError {
  code: string;
  message: string;
}

export function getAuthError(e: unknown): string {
  const error = e as MyError;
  switch (error.code) {
    case 'auth/email-already-in-use':
      return 'The email address is already in use';
    case 'auth/invalid-email':
      return 'The email address is not valid.';
    case 'auth/operation-not-allowed':
      return 'Operation not allowed.';
    case 'auth/user-not-found':
      return 'User not found!';
    case 'auth/wrong-password':
      return 'Wrong username or password!';
    default:
      console.log(error.code);
      return error.message;
  }
}
