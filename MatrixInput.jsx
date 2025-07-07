import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Label } from '@/components/ui/label.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx'
import { Plus, Minus } from 'lucide-react'

function MatrixInput({ onSolve, title, description }) {
  const [size, setSize] = useState(2)
  const [coefficients, setCoefficients] = useState([[1, 2], [3, 4]])
  const [constants, setConstants] = useState([5, 6])

  // Update matrix size when size changes
  useEffect(() => {
    const newCoefficients = Array(size).fill().map((_, i) => 
      Array(size).fill().map((_, j) => 
        coefficients[i] && coefficients[i][j] !== undefined ? coefficients[i][j] : (i === j ? 1 : 0)
      )
    )
    const newConstants = Array(size).fill().map((_, i) => 
      constants[i] !== undefined ? constants[i] : 1
    )
    
    setCoefficients(newCoefficients)
    setConstants(newConstants)
  }, [size])

  const updateCoefficient = (row, col, value) => {
    const newCoefficients = [...coefficients]
    newCoefficients[row][col] = parseFloat(value) || 0
    setCoefficients(newCoefficients)
  }

  const updateConstant = (index, value) => {
    const newConstants = [...constants]
    newConstants[index] = parseFloat(value) || 0
    setConstants(newConstants)
  }

  const handleSolve = () => {
    onSolve(coefficients, constants)
  }

  const loadExample = (exampleType) => {
    if (exampleType === 'simple2x2') {
      setSize(2)
      setCoefficients([[2, 3], [1, -1]])
      setConstants([7, 1])
    } else if (exampleType === 'simple3x3') {
      setSize(3)
      setCoefficients([[4, -1, 0], [-1, 4, -1], [0, -1, 4]])
      setConstants([15, 10, 10])
    } else if (exampleType === 'diagonal') {
      setSize(3)
      setCoefficients([[5, -2, 3], [-3, 9, 1], [2, -1, -7]])
      setConstants([1, 2, 3])
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Matrix Size Selection */}
        <div className="space-y-2">
          <Label>System Size</Label>
          <Select value={size.toString()} onValueChange={(value) => setSize(parseInt(value))}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2">2×2</SelectItem>
              <SelectItem value="3">3×3</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Example Buttons */}
        <div className="space-y-2">
          <Label>Quick Examples</Label>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" onClick={() => loadExample('simple2x2')}>
              Simple 2×2
            </Button>
            <Button variant="outline" size="sm" onClick={() => loadExample('simple3x3')}>
              Simple 3×3
            </Button>
            <Button variant="outline" size="sm" onClick={() => loadExample('diagonal')}>
              Diagonal Dominant
            </Button>
          </div>
        </div>

        {/* Matrix Input */}
        <div className="space-y-4">
          <Label>System of Linear Equations</Label>
          
          <div className="space-y-3">
            {coefficients.map((row, i) => (
              <div key={i} className="flex items-center space-x-2 flex-wrap">
                {row.map((coeff, j) => (
                  <div key={j} className="flex items-center space-x-1">
                    <Input
                      type="number"
                      step="any"
                      value={coeff}
                      onChange={(e) => updateCoefficient(i, j, e.target.value)}
                      className="w-20 text-center"
                    />
                    <span className="text-sm font-medium">
                      x<sub>{j + 1}</sub>
                    </span>
                    {j < row.length - 1 && <Plus className="h-4 w-4 text-gray-400" />}
                  </div>
                ))}
                <span className="text-lg font-medium">=</span>
                <Input
                  type="number"
                  step="any"
                  value={constants[i]}
                  onChange={(e) => updateConstant(i, e.target.value)}
                  className="w-20 text-center"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Matrix Representation */}
        <div className="space-y-2">
          <Label>Matrix Form (AX = B)</Label>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center space-x-4 text-sm font-mono">
              {/* Coefficient Matrix A */}
              <div className="space-y-1">
                <div className="text-xs text-gray-500 text-center">A</div>
                <div className="border-l-2 border-r-2 border-gray-400 px-2">
                  {coefficients.map((row, i) => (
                    <div key={i} className="flex space-x-2">
                      {row.map((coeff, j) => (
                        <span key={j} className="w-8 text-center">
                          {coeff}
                        </span>
                      ))}
                    </div>
                  ))}
                </div>
              </div>

              {/* Variable Vector X */}
              <div className="space-y-1">
                <div className="text-xs text-gray-500 text-center">X</div>
                <div className="border-l-2 border-r-2 border-gray-400 px-2">
                  {Array(size).fill().map((_, i) => (
                    <div key={i} className="text-center">
                      x<sub>{i + 1}</sub>
                    </div>
                  ))}
                </div>
              </div>

              <span>=</span>

              {/* Constants Vector B */}
              <div className="space-y-1">
                <div className="text-xs text-gray-500 text-center">B</div>
                <div className="border-l-2 border-r-2 border-gray-400 px-2">
                  {constants.map((constant, i) => (
                    <div key={i} className="text-center">
                      {constant}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Solve Button */}
        <Button onClick={handleSolve} className="w-full" size="lg">
          Solve System
        </Button>
      </CardContent>
    </Card>
  )
}

export default MatrixInput

