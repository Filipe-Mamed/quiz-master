// Personalização de erros HTTP para a aplicação de Service

/**
 * Erro de requisição inválida
 */
export class BadRequestError extends Error {
  statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = 400;
    this.name = "BadRequest_400";
  }
}

/**
 * Erro de autenticação
 */
export class UnauthorizedError extends Error {
  statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = 401;
    this.name = "Unauthorized_401";
  }
}

/**
 * Erro de permissão negada
 */
export class ForbiddenError extends Error {
  statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = 403;
    this.name = "Forbidden_403";
  }
}

/**
 * Erro de recurso não encontrado
 */
export class NotFoundError extends Error {
  statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = 404;
    this.name = "NotFound_404";
  }
}

/**
 * Erro de servidor interno
 */
export class InternalServerError extends Error {
  statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = 500;
    this.name = "InternalServerError_500";
  }
}
