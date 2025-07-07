import { useState } from "react";
import { Calculator, BookOpen, AlertTriangle } from "lucide-react";
import MatrixInput from "../components/MatrixInput";
import SolutionDisplay from "../components/SolutionDisplay";
import { solveByInverseMatrix } from "../lib/matrixOperations";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.jsx";
import { Alert, AlertDescription } from "@/components/ui/alert.jsx";

function InverseMatrixPage() {
  const [solution, setSolution] = useState(null);

  const handleSolve = (coefficients, constants) => {
    try {
      const result = solveByInverseMatrix(coefficients, constants);
      setSolution(result);
    } catch (error) {
      setSolution({
        success: false,
        error: error.message,
        steps: [],
      });
    }
  };

  return (
    <div className="space-y-8 text-gray-200">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <div className="bg-green-900/30 p-3 rounded-full backdrop-blur-sm">
            <Calculator className="h-8 w-8 text-green-400" />
          </div>
        </div>
        <div>
          <h1 className="text-3xl font-bold text-white">
            Metode Matriks Balikan
          </h1>
          <p className="text-lg text-gray-300 mt-2">
            Selesaikan sistem persamaan linear menggunakan invers matriks
          </p>
        </div>
      </div>

      {/* Method Overview */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <BookOpen className="h-5 w-5 text-blue-400" />
            <CardTitle className="text-white">
              Cara Kerja Metode Matriks Balikan
            </CardTitle>
          </div>
          <CardDescription className="text-gray-400">
            Memahami dasar matematika di balik metode ini
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h3 className="font-semibold text-lg text-white">Proses</h3>
              <ol className="space-y-2 text-sm text-gray-300">
                <li className="flex items-start space-x-2">
                  <span className="bg-blue-900/30 text-blue-400 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                    1
                  </span>
                  <span>
                    Ubah sistem ke bentuk matriks: <strong>AX = B</strong>
                  </span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="bg-blue-900/30 text-blue-400 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                    2
                  </span>
                  <span>Hitung determinan matriks A</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="bg-blue-900/30 text-blue-400 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                    3
                  </span>
                  <span>Temukan matriks balikan A⁻¹</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="bg-blue-900/30 text-blue-400 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                    4
                  </span>
                  <span>
                    Hitung solusi: <strong>X = A⁻¹B</strong>
                  </span>
                </li>
              </ol>
            </div>

            <div className="space-y-3">
              <h3 className="font-semibold text-lg text-white">
                Kapan Menggunakan Metode Ini
              </h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="flex items-start space-x-2">
                  <span className="text-green-400">✓</span>
                  <span>Sistem kecil hingga menengah (2×2, 3×3)</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-400">✓</span>
                  <span>Ketika Anda membutuhkan solusi eksak</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-400">✓</span>
                  <span>Matriks koefisien non-singular (det ≠ 0)</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-red-400">✗</span>
                  <span>Sistem besar (komputasi mahal)</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-red-400">✗</span>
                  <span>Ketika matriks singular atau hampir singular</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Important Notes */}
      <Alert className="bg-gray-800 border-gray-700">
        <AlertTriangle className="h-4 w-4 text-yellow-400" />
        <AlertDescription className="text-gray-300">
          <strong className="text-white">Penting:</strong> Metode matriks
          balikan hanya bekerja ketika matriks koefisien memiliki determinan
          tidak nol. Jika determinan nol, sistem tidak memiliki solusi atau
          memiliki solusi tak terhingga.
        </AlertDescription>
      </Alert>

      {/* Input Section */}
      <MatrixInput
        onSolve={handleSolve}
        title="Masukkan Sistem Persamaan Linear Anda"
        description="Masukkan koefisien dan konstanta untuk sistem Anda. Alat ini akan menunjukkan setiap langkah proses penyelesaian."
      />

      {/* Solution Display */}
      {solution && (
        <SolutionDisplay solution={solution} method="Metode Matriks Balikan" />
      )}

      {/* Educational Tips */}
      <Card className="bg-blue-900/10 border-blue-700 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-blue-400">Tips Pembelajaran</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-blue-300">
          <div className="space-y-2">
            <h4 className="font-semibold text-white">
              Memahami Setiap Langkah:
            </h4>
            <ul className="space-y-1 text-sm">
              <li>
                • <strong>Determinan:</strong> Memberitahu apakah sistem
                memiliki solusi unik
              </li>
              <li>
                • <strong>Matriks Balikan:</strong> Operasi "pembagian" untuk
                matriks
              </li>
              <li>
                • <strong>Perkalian Matriks:</strong> Bagaimana kita menerapkan
                invers untuk menemukan solusi
              </li>
            </ul>
          </div>

          <div className="space-y-2">
            <h4 className="font-semibold text-white">
              Kesalahan Umum yang Harus Dihindari:
            </h4>
            <ul className="space-y-1 text-sm">
              <li>• Lupa memeriksa apakah determinan nol</li>
              <li>• Tertukar urutan perkalian matriks</li>
              <li>• Kesalahan perhitungan dalam mencari minor dan kofaktor</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default InverseMatrixPage;
