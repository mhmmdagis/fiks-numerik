// Matrix operations utility functions for the Linear Equation Solver

/**
 * Calculate the determinant of a 2x2 matrix
 * @param {Array<Array<number>>} matrix - 2x2 matrix
 * @returns {number} determinant value
 */
export function determinant2x2(matrix) {
  if (matrix.length !== 2 || matrix[0].length !== 2) {
    throw new Error('Matrix must be 2x2');
  }
  return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];
}

/**
 * Calculate the determinant of a 3x3 matrix using cofactor expansion
 * @param {Array<Array<number>>} matrix - 3x3 matrix
 * @returns {number} determinant value
 */
export function determinant3x3(matrix) {
  if (matrix.length !== 3 || matrix[0].length !== 3) {
    throw new Error('Matrix must be 3x3');
  }
  
  const a = matrix[0][0];
  const b = matrix[0][1];
  const c = matrix[0][2];
  
  const minor1 = matrix[1][1] * matrix[2][2] - matrix[1][2] * matrix[2][1];
  const minor2 = matrix[1][0] * matrix[2][2] - matrix[1][2] * matrix[2][0];
  const minor3 = matrix[1][0] * matrix[2][1] - matrix[1][1] * matrix[2][0];
  
  return a * minor1 - b * minor2 + c * minor3;
}

/**
 * Calculate the inverse of a 2x2 matrix
 * @param {Array<Array<number>>} matrix - 2x2 matrix
 * @returns {Array<Array<number>>} inverse matrix
 */
export function inverse2x2(matrix) {
  const det = determinant2x2(matrix);
  
  if (Math.abs(det) < 1e-10) {
    throw new Error('Matrix is singular (determinant is zero)');
  }
  
  const a = matrix[0][0];
  const b = matrix[0][1];
  const c = matrix[1][0];
  const d = matrix[1][1];
  
  return [
    [d / det, -b / det],
    [-c / det, a / det]
  ];
}

/**
 * Calculate the inverse of a 3x3 matrix
 * @param {Array<Array<number>>} matrix - 3x3 matrix
 * @returns {Array<Array<number>>} inverse matrix
 */
export function inverse3x3(matrix) {
  const det = determinant3x3(matrix);
  
  if (Math.abs(det) < 1e-10) {
    throw new Error('Matrix is singular (determinant is zero)');
  }
  
  // Calculate cofactor matrix
  const cofactors = [];
  for (let i = 0; i < 3; i++) {
    cofactors[i] = [];
    for (let j = 0; j < 3; j++) {
      const minor = getMinor3x3(matrix, i, j);
      const cofactor = Math.pow(-1, i + j) * determinant2x2(minor);
      cofactors[i][j] = cofactor;
    }
  }
  
  // Transpose cofactor matrix to get adjugate matrix
  const adjugate = transpose(cofactors);
  
  // Divide by determinant
  return adjugate.map(row => row.map(val => val / det));
}

/**
 * Get the minor matrix by removing row i and column j from a 3x3 matrix
 * @param {Array<Array<number>>} matrix - 3x3 matrix
 * @param {number} row - row to remove
 * @param {number} col - column to remove
 * @returns {Array<Array<number>>} 2x2 minor matrix
 */
function getMinor3x3(matrix, row, col) {
  const minor = [];
  for (let i = 0; i < 3; i++) {
    if (i === row) continue;
    const newRow = [];
    for (let j = 0; j < 3; j++) {
      if (j === col) continue;
      newRow.push(matrix[i][j]);
    }
    minor.push(newRow);
  }
  return minor;
}

/**
 * Transpose a matrix
 * @param {Array<Array<number>>} matrix - input matrix
 * @returns {Array<Array<number>>} transposed matrix
 */
export function transpose(matrix) {
  const rows = matrix.length;
  const cols = matrix[0].length;
  const result = [];
  
  for (let j = 0; j < cols; j++) {
    result[j] = [];
    for (let i = 0; i < rows; i++) {
      result[j][i] = matrix[i][j];
    }
  }
  
  return result;
}

/**
 * Multiply two matrices
 * @param {Array<Array<number>>} A - first matrix
 * @param {Array<Array<number>>} B - second matrix
 * @returns {Array<Array<number>>} result matrix
 */
export function multiplyMatrices(A, B) {
  const rowsA = A.length;
  const colsA = A[0].length;
  const rowsB = B.length;
  const colsB = B[0].length;
  
  if (colsA !== rowsB) {
    throw new Error('Matrix dimensions are incompatible for multiplication');
  }
  
  const result = [];
  for (let i = 0; i < rowsA; i++) {
    result[i] = [];
    for (let j = 0; j < colsB; j++) {
      let sum = 0;
      for (let k = 0; k < colsA; k++) {
        sum += A[i][k] * B[k][j];
      }
      result[i][j] = sum;
    }
  }
  
  return result;
}

/**
 * Solve a system of linear equations using the inverse matrix method
 * @param {Array<Array<number>>} coefficients - coefficient matrix A
 * @param {Array<number>} constants - constants vector b
 * @returns {Object} solution object with steps and result
 */
export function solveByInverseMatrix(coefficients, constants) {
  const steps = [];
  const n = coefficients.length;
  
  // Step 1: Display the system in matrix form
  steps.push({
    title: "Step 1: System in Matrix Form",
    description: "We represent the system AX = B where A is the coefficient matrix, X is the variable vector, and B is the constants vector.",
    matrix: coefficients,
    constants: constants,
    explanation: "This is the standard matrix representation of a system of linear equations."
  });
  
  let inverse, determinant;
  
  try {
    // Step 2: Calculate determinant
    if (n === 2) {
      determinant = determinant2x2(coefficients);
      steps.push({
        title: "Step 2: Calculate Determinant",
        description: `For a 2×2 matrix [[a,b],[c,d]], det = ad - bc`,
        calculation: `det = (${coefficients[0][0]})(${coefficients[1][1]}) - (${coefficients[0][1]})(${coefficients[1][0]}) = ${determinant}`,
        result: determinant,
        explanation: "The determinant tells us if the matrix has an inverse. If det ≠ 0, the inverse exists."
      });
      
      // Step 3: Calculate inverse
      inverse = inverse2x2(coefficients);
    } else if (n === 3) {
      determinant = determinant3x3(coefficients);
      steps.push({
        title: "Step 2: Calculate Determinant",
        description: "For a 3×3 matrix, we use cofactor expansion along the first row",
        calculation: `det = ${determinant}`,
        result: determinant,
        explanation: "The determinant tells us if the matrix has an inverse. If det ≠ 0, the inverse exists."
      });
      
      // Step 3: Calculate inverse
      inverse = inverse3x3(coefficients);
    } else {
      throw new Error('Only 2x2 and 3x3 systems are supported');
    }
    
    steps.push({
      title: "Step 3: Calculate Inverse Matrix",
      description: "We calculate A⁻¹ using the formula A⁻¹ = (1/det(A)) × adj(A)",
      matrix: inverse,
      explanation: "The inverse matrix allows us to solve for X by computing X = A⁻¹B."
    });
    
    // Step 4: Multiply inverse by constants
    const constantsMatrix = constants.map(c => [c]);
    const solution = multiplyMatrices(inverse, constantsMatrix);
    const solutionVector = solution.map(row => row[0]);
    
    steps.push({
      title: "Step 4: Calculate Solution",
      description: "Multiply A⁻¹ by B to get X = A⁻¹B",
      calculation: "X = A⁻¹ × B",
      result: solutionVector,
      explanation: "This gives us the values of our variables."
    });
    
    return {
      success: true,
      solution: solutionVector,
      steps: steps,
      determinant: determinant,
      inverse: inverse
    };
    
  } catch (error) {
    return {
      success: false,
      error: error.message,
      steps: steps
    };
  }
}

