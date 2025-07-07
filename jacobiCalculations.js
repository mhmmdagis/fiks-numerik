// Jacobi iteration method utility functions for the Linear Equation Solver

/**
 * Check if a matrix is diagonally dominant
 * @param {Array<Array<number>>} matrix - coefficient matrix
 * @returns {boolean} true if diagonally dominant
 */
export function isDiagonallyDominant(matrix) {
  const n = matrix.length;
  
  for (let i = 0; i < n; i++) {
    const diagonal = Math.abs(matrix[i][i]);
    let sumOffDiagonal = 0;
    
    for (let j = 0; j < n; j++) {
      if (i !== j) {
        sumOffDiagonal += Math.abs(matrix[i][j]);
      }
    }
    
    if (diagonal <= sumOffDiagonal) {
      return false;
    }
  }
  
  return true;
}

/**
 * Solve a system of linear equations using the Jacobi iteration method
 * @param {Array<Array<number>>} coefficients - coefficient matrix A
 * @param {Array<number>} constants - constants vector b
 * @param {number} tolerance - convergence tolerance (default: 1e-6)
 * @param {number} maxIterations - maximum number of iterations (default: 100)
 * @returns {Object} solution object with steps and result
 */
export function solveByJacobiIteration(coefficients, constants, tolerance = 1e-6, maxIterations = 100) {
  const steps = [];
  const n = coefficients.length;
  
  // Step 1: Display the system and check diagonal dominance
  const isDominant = isDiagonallyDominant(coefficients);
  steps.push({
    title: "Step 1: System Setup and Diagonal Dominance Check",
    description: "We check if the coefficient matrix is diagonally dominant to ensure convergence.",
    matrix: coefficients,
    constants: constants,
    isDiagonallyDominant: isDominant,
    explanation: isDominant 
      ? "The matrix is diagonally dominant, so the Jacobi method will converge."
      : "Warning: The matrix is not diagonally dominant. Convergence is not guaranteed."
  });
  
  // Step 2: Rewrite equations for iteration
  const iterationEquations = [];
  for (let i = 0; i < n; i++) {
    let equation = `x${i + 1} = (${constants[i]}`;
    for (let j = 0; j < n; j++) {
      if (i !== j) {
        const coeff = -coefficients[i][j];
        const sign = coeff >= 0 ? '+' : '';
        equation += ` ${sign}${coeff}*x${j + 1}`;
      }
    }
    equation += `) / ${coefficients[i][i]}`;
    iterationEquations.push(equation);
  }
  
  steps.push({
    title: "Step 2: Rewrite Equations for Iteration",
    description: "We solve each equation for its diagonal variable.",
    equations: iterationEquations,
    explanation: "Each equation is rearranged to express one variable in terms of the others."
  });
  
  // Step 3: Initial guess
  let x = new Array(n).fill(0);
  steps.push({
    title: "Step 3: Initial Guess",
    description: "We start with an initial guess for all variables.",
    initialGuess: [...x],
    explanation: "A common choice is to set all variables to 0 initially."
  });
  
  // Iteration steps
  const iterations = [];
  let converged = false;
  let iteration = 0;
  
  while (iteration < maxIterations && !converged) {
    const xNew = new Array(n);
    const iterationStep = {
      iteration: iteration + 1,
      calculations: [],
      oldValues: [...x],
      newValues: [],
      errors: []
    };
    
    // Calculate new values
    for (let i = 0; i < n; i++) {
      let sum = constants[i];
      let calculation = `x${i + 1}^(${iteration + 1}) = (${constants[i]}`;
      
      for (let j = 0; j < n; j++) {
        if (i !== j) {
          sum -= coefficients[i][j] * x[j];
          const coeff = -coefficients[i][j];
          const sign = coeff >= 0 ? '+' : '';
          calculation += ` ${sign}${coeff}*${x[j].toFixed(6)}`;
        }
      }
      
      xNew[i] = sum / coefficients[i][i];
      calculation += `) / ${coefficients[i][i]} = ${xNew[i].toFixed(6)}`;
      
      iterationStep.calculations.push(calculation);
      iterationStep.newValues.push(xNew[i]);
    }
    
    // Check convergence
    let maxError = 0;
    for (let i = 0; i < n; i++) {
      const error = Math.abs(xNew[i] - x[i]);
      iterationStep.errors.push(error);
      maxError = Math.max(maxError, error);
    }
    
    iterationStep.maxError = maxError;
    iterationStep.converged = maxError < tolerance;
    
    iterations.push(iterationStep);
    
    if (maxError < tolerance) {
      converged = true;
    }
    
    x = [...xNew];
    iteration++;
  }
  
  steps.push({
    title: "Step 4: Iterations",
    description: "We iterate until convergence or maximum iterations reached.",
    iterations: iterations,
    explanation: "In each iteration, we use the previous values to calculate new values for all variables simultaneously."
  });
  
  // Final result
  const finalStep = {
    title: converged ? "Step 5: Convergence Achieved" : "Step 5: Maximum Iterations Reached",
    description: converged 
      ? `Solution converged after ${iteration} iterations with tolerance ${tolerance}.`
      : `Maximum iterations (${maxIterations}) reached. Solution may not be accurate.`,
    solution: x,
    converged: converged,
    iterations: iteration,
    explanation: converged 
      ? "The solution has converged to the desired accuracy."
      : "Consider increasing the maximum iterations or checking if the system is suitable for Jacobi iteration."
  };
  
  steps.push(finalStep);
  
  return {
    success: true,
    solution: x,
    steps: steps,
    converged: converged,
    iterations: iteration,
    tolerance: tolerance,
    isDiagonallyDominant: isDominant
  };
}

/**
 * Format a number for display (removes very small numbers that are essentially zero)
 * @param {number} num - number to format
 * @param {number} precision - decimal places (default: 6)
 * @returns {string} formatted number
 */
export function formatNumber(num, precision = 6) {
  if (Math.abs(num) < 1e-10) {
    return '0';
  }
  return num.toFixed(precision);
}

/**
 * Validate input for Jacobi iteration
 * @param {Array<Array<number>>} coefficients - coefficient matrix
 * @param {Array<number>} constants - constants vector
 * @returns {Object} validation result
 */
export function validateJacobiInput(coefficients, constants) {
  const n = coefficients.length;
  
  // Check if matrix is square
  if (!coefficients.every(row => row.length === n)) {
    return {
      valid: false,
      error: "Coefficient matrix must be square"
    };
  }
  
  // Check if constants vector has correct length
  if (constants.length !== n) {
    return {
      valid: false,
      error: "Constants vector length must match matrix size"
    };
  }
  
  // Check for zero diagonal elements
  for (let i = 0; i < n; i++) {
    if (Math.abs(coefficients[i][i]) < 1e-10) {
      return {
        valid: false,
        error: `Diagonal element at position (${i+1}, ${i+1}) is zero or very small. Jacobi method requires non-zero diagonal elements.`
      };
    }
  }
  
  return {
    valid: true,
    isDiagonallyDominant: isDiagonallyDominant(coefficients)
  };
}

