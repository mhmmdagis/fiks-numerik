import { useState } from 'react'
import { ChevronDown, ChevronRight, CheckCircle, AlertCircle, Info } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Button } from '@/components/ui/button.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible.jsx'

function MatrixDisplay({ matrix, label }) {
  if (!matrix || !matrix.length) return null

  return (
    <div className="space-y-1">
      {label && <div className="text-xs text-gray-500 text-center font-medium">{label}</div>}
      <div className="border-l-2 border-r-2 border-gray-400 px-3 py-1 bg-gray-50 rounded">
        {matrix.map((row, i) => (
          <div key={i} className="flex space-x-3 justify-center font-mono text-sm">
            {Array.isArray(row) ? (
              row.map((val, j) => (
                <span key={j} className="w-16 text-center">
                  {typeof val === 'number' ? val.toFixed(4) : val}
                </span>
              ))
            ) : (
              <span className="w-16 text-center">
                {typeof row === 'number' ? row.toFixed(4) : row}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

function StepCard({ step, stepNumber, isExpanded, onToggle }) {
  const getStepIcon = () => {
    if (step.title.includes('Error') || step.title.includes('Warning')) {
      return <AlertCircle className="h-5 w-5 text-red-500" />
    }
    if (step.title.includes('Solution') || step.title.includes('Converged')) {
      return <CheckCircle className="h-5 w-5 text-green-500" />
    }
    return <Info className="h-5 w-5 text-blue-500" />
  }

  return (
    <Card className="border-l-4 border-l-blue-500">
      <Collapsible open={isExpanded} onOpenChange={onToggle}>
        <CollapsibleTrigger asChild>
          <CardHeader className="cursor-pointer hover:bg-gray-50 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {getStepIcon()}
                <div>
                  <CardTitle className="text-lg">
                    {stepNumber && `Step ${stepNumber}: `}{step.title}
                  </CardTitle>
                  <CardDescription>{step.description}</CardDescription>
                </div>
              </div>
              {isExpanded ? (
                <ChevronDown className="h-5 w-5 text-gray-400" />
              ) : (
                <ChevronRight className="h-5 w-5 text-gray-400" />
              )}
            </div>
          </CardHeader>
        </CollapsibleTrigger>
        
        <CollapsibleContent>
          <CardContent className="space-y-4">
            {/* Matrix Display */}
            {step.matrix && (
              <div className="flex justify-center">
                <MatrixDisplay matrix={step.matrix} label="Matrix" />
              </div>
            )}

            {/* Constants Display */}
            {step.constants && (
              <div className="flex justify-center">
                <MatrixDisplay matrix={step.constants.map(c => [c])} label="Constants" />
              </div>
            )}

            {/* Calculation Display */}
            {step.calculation && (
              <div className="bg-blue-50 p-3 rounded-lg">
                <div className="text-sm font-mono text-blue-800">
                  {step.calculation}
                </div>
              </div>
            )}

            {/* Result Display */}
            {step.result !== undefined && (
              <div className="bg-green-50 p-3 rounded-lg">
                <div className="text-sm">
                  <span className="font-medium">Result: </span>
                  {Array.isArray(step.result) ? (
                    <div className="mt-2">
                      {step.result.map((val, i) => (
                        <div key={i} className="font-mono">
                          x<sub>{i + 1}</sub> = {typeof val === 'number' ? val.toFixed(6) : val}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <span className="font-mono">{typeof step.result === 'number' ? step.result.toFixed(6) : step.result}</span>
                  )}
                </div>
              </div>
            )}

            {/* Solution Display */}
            {step.solution && (
              <div className="bg-green-50 p-3 rounded-lg">
                <div className="text-sm">
                  <span className="font-medium">Solution: </span>
                  <div className="mt-2">
                    {step.solution.map((val, i) => (
                      <div key={i} className="font-mono">
                        x<sub>{i + 1}</sub> = {typeof val === 'number' ? val.toFixed(6) : val}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Equations Display */}
            {step.equations && (
              <div className="space-y-2">
                <div className="text-sm font-medium">Iteration Equations:</div>
                {step.equations.map((eq, i) => (
                  <div key={i} className="bg-gray-50 p-2 rounded font-mono text-sm">
                    {eq}
                  </div>
                ))}
              </div>
            )}

            {/* Initial Guess */}
            {step.initialGuess && (
              <div className="bg-yellow-50 p-3 rounded-lg">
                <div className="text-sm">
                  <span className="font-medium">Initial Guess: </span>
                  <div className="mt-1 font-mono">
                    {step.initialGuess.map((val, i) => (
                      <span key={i} className="mr-4">
                        x<sub>{i + 1}</sub><sup>(0)</sup> = {typeof val === 'number' ? val.toFixed(6) : val}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Iterations Display */}
            {step.iterations && step.iterations.length > 0 && (
              <div className="space-y-3">
                <div className="text-sm font-medium">Iterations:</div>
                {step.iterations.slice(0, 5).map((iteration, i) => (
                  <div key={i} className="border rounded-lg p-3 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Iteration {iteration.iteration || i + 1}</span>
                      <div className="flex items-center space-x-2">
                        {iteration.maxError !== undefined && (
                          <Badge variant={iteration.converged ? "default" : "secondary"}>
                            Max Error: {typeof iteration.maxError === 'number' ? iteration.maxError.toFixed(8) : 'N/A'}
                          </Badge>
                        )}
                        {iteration.converged && (
                          <Badge variant="default">Converged</Badge>
                        )}
                      </div>
                    </div>
                    
                    {iteration.calculations && iteration.calculations.length > 0 && (
                      <div className="space-y-1">
                        {iteration.calculations.map((calc, j) => (
                          <div key={j} className="text-xs font-mono bg-gray-50 p-2 rounded">
                            {calc}
                          </div>
                        ))}
                      </div>
                    )}
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      {iteration.oldValues && iteration.oldValues.length > 0 && (
                        <div>
                          <span className="font-medium">Previous: </span>
                          {iteration.oldValues.map((val, j) => (
                            <span key={j} className="mr-2 font-mono">
                              x<sub>{j + 1}</sub> = {typeof val === 'number' ? val.toFixed(6) : val}
                            </span>
                          ))}
                        </div>
                      )}
                      {iteration.newValues && iteration.newValues.length > 0 && (
                        <div>
                          <span className="font-medium">New: </span>
                          {iteration.newValues.map((val, j) => (
                            <span key={j} className="mr-2 font-mono">
                              x<sub>{j + 1}</sub> = {typeof val === 'number' ? val.toFixed(6) : val}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                
                {step.iterations.length > 5 && (
                  <div className="text-center text-sm text-gray-500">
                    ... and {step.iterations.length - 5} more iterations
                  </div>
                )}
              </div>
            )}

            {/* Convergence Info */}
            {step.converged !== undefined && (
              <div className={`p-3 rounded-lg ${step.converged ? 'bg-green-50' : 'bg-yellow-50'}`}>
                <div className="flex items-center space-x-2">
                  {step.converged ? (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  ) : (
                    <AlertCircle className="h-4 w-4 text-yellow-500" />
                  )}
                  <span className="text-sm font-medium">
                    {step.converged ? 'Converged Successfully' : 'Did Not Converge'}
                  </span>
                </div>
                {step.iterations !== undefined && (
                  <div className="text-sm text-gray-600 mt-1">
                    Iterations: {step.iterations}
                  </div>
                )}
              </div>
            )}

            {/* Diagonal Dominance Check */}
            {step.isDiagonallyDominant !== undefined && (
              <div className={`p-3 rounded-lg ${step.isDiagonallyDominant ? 'bg-green-50' : 'bg-yellow-50'}`}>
                <div className="flex items-center space-x-2">
                  {step.isDiagonallyDominant ? (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  ) : (
                    <AlertCircle className="h-4 w-4 text-yellow-500" />
                  )}
                  <span className="text-sm font-medium">
                    {step.isDiagonallyDominant ? 'Diagonally Dominant' : 'Not Diagonally Dominant'}
                  </span>
                </div>
              </div>
            )}

            {/* Explanation */}
            {step.explanation && (
              <div className="bg-blue-50 border-l-4 border-blue-400 p-3">
                <div className="text-sm text-blue-800">
                  <strong>Explanation:</strong> {step.explanation}
                </div>
              </div>
            )}
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  )
}

function SolutionDisplay({ solution, method }) {
  const [expandedSteps, setExpandedSteps] = useState(new Set([0]))

  if (!solution) {
    return (
      <div className="text-center py-8 text-gray-500">
        Enter a system of equations and click "Solve System" to see the step-by-step solution.
      </div>
    )
  }

  const toggleStep = (index) => {
    const newExpanded = new Set(expandedSteps)
    if (newExpanded.has(index)) {
      newExpanded.delete(index)
    } else {
      newExpanded.add(index)
    }
    setExpandedSteps(newExpanded)
  }

  const expandAll = () => {
    if (solution.steps) {
      setExpandedSteps(new Set(solution.steps.map((_, i) => i)))
    }
  }

  const collapseAll = () => {
    setExpandedSteps(new Set())
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">
            Solution using {method}
          </h2>
          {solution.success ? (
            <p className="text-green-600 flex items-center space-x-1">
              <CheckCircle className="h-4 w-4" />
              <span>Solution found successfully</span>
            </p>
          ) : (
            <p className="text-red-600 flex items-center space-x-1">
              <AlertCircle className="h-4 w-4" />
              <span>Error: {solution.error}</span>
            </p>
          )}
        </div>
        
        {solution.steps && solution.steps.length > 0 && (
          <div className="space-x-2">
            <Button variant="outline" size="sm" onClick={expandAll}>
              Expand All
            </Button>
            <Button variant="outline" size="sm" onClick={collapseAll}>
              Collapse All
            </Button>
          </div>
        )}
      </div>

      {/* Final Solution Summary */}
      {solution.success && solution.solution && (
        <Card className="border-green-200 bg-green-50">
          <CardHeader>
            <CardTitle className="text-green-800">Final Solution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {solution.solution.map((value, i) => (
                <div key={i} className="text-center p-3 bg-white rounded-lg">
                  <div className="text-lg font-mono">
                    x<sub>{i + 1}</sub> = {typeof value === 'number' ? value.toFixed(6) : value}
                  </div>
                </div>
              ))}
            </div>
            
            {/* Additional info for Jacobi method */}
            {method === 'Jacobi Iteration Method' && (
              <div className="mt-4 text-sm text-green-700 space-y-1">
                <div>Converged: {solution.converged ? 'Yes' : 'No'}</div>
                <div>Iterations: {solution.iterations || 'N/A'}</div>
                <div>Tolerance: {solution.tolerance || 'N/A'}</div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Steps */}
      {solution.steps && solution.steps.length > 0 && (
        <div className="space-y-4">
          {solution.steps.map((step, index) => (
            <StepCard
              key={index}
              step={step}
              stepNumber={index + 1}
              isExpanded={expandedSteps.has(index)}
              onToggle={() => toggleStep(index)}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default SolutionDisplay

