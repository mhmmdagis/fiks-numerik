import { useState } from "react";
import { Zap, BookOpen, AlertTriangle, Settings } from "lucide-react";
import MatrixInput from "../components/MatrixInput";
import SolutionDisplay from "../components/SolutionDisplay";
import {
  solveByJacobiIteration,
  validateJacobiInput,
} from "../lib/jacobiCalculations";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.jsx";
import { Alert, AlertDescription } from "@/components/ui/alert.jsx";
import { Label } from "@/components/ui/label.jsx";
import { Input } from "@/components/ui/input.jsx";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible.jsx";
import { Button } from "@/components/ui/button.jsx";

function JacobiPage() {
  const [solution, setSolution] = useState(null);
  const [tolerance, setTolerance] = useState(1e-6);
  const [maxIterations, setMaxIterations] = useState(100);
  const [showSettings, setShowSettings] = useState(false);

  const handleSolve = (coefficients, constants) => {
    try {
      const validation = validateJacobiInput(coefficients, constants);
      if (!validation.valid) {
        setSolution({
          success: false,
          error: validation.error,
          steps: [],
        });
        return;
      }

      const result = solveByJacobiIteration(
        coefficients,
        constants,
        tolerance,
        maxIterations
      );
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
          <div className="bg-purple-900/30 p-3 rounded-full backdrop-blur-sm">
            <Zap className="h-8 w-8 text-purple-400" />
          </div>
        </div>
        <div>
          <h1 className="text-3xl font-bold text-white">
            Metode Iterasi Jacobi
          </h1>
          <p className="text-lg text-gray-300 mt-2">
            Selesaikan sistem persamaan linear menggunakan pendekatan iteratif
          </p>
        </div>
      </div>

      {/* Method Overview */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <BookOpen className="h-5 w-5 text-blue-400" />
            <CardTitle className="text-white">
              Cara Kerja Metode Iterasi Jacobi
            </CardTitle>
          </div>
          <CardDescription className="text-gray-400">
            Memahami pendekatan iteratif untuk menyelesaikan sistem linear
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h3 className="font-semibold text-lg text-white">Proses</h3>
              <ol className="space-y-2 text-sm text-gray-300">
                <li className="flex items-start space-x-2">
                  <span className="bg-purple-900/30 text-purple-400 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                    1
                  </span>
                  <span>
                    Susun ulang setiap persamaan untuk menyelesaikan satu
                    variabel
                  </span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="bg-purple-900/30 text-purple-400 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                    2
                  </span>
                  <span>Mulai dengan tebakan awal (biasanya semua nol)</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="bg-purple-900/30 text-purple-400 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                    3
                  </span>
                  <span>Hitung nilai baru menggunakan iterasi sebelumnya</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="bg-purple-900/30 text-purple-400 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                    4
                  </span>
                  <span>
                    Ulangi hingga konvergen atau mencapai iterasi maksimum
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
                  <span>Sistem persamaan besar</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-400">✓</span>
                  <span>Matriks dominan diagonal</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-400">✓</span>
                  <span>Ketika solusi perkiraan dapat diterima</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-red-400">✗</span>
                  <span>Ketika solusi eksak diperlukan</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-red-400">✗</span>
                  <span>
                    Sistem non-dominan diagonal (mungkin tidak konvergen)
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Diagonal Dominance Explanation */}
          <div className="bg-blue-900/20 p-4 rounded-lg border-l-4 border-blue-500 backdrop-blur-sm">
            <h4 className="font-semibold text-blue-300 mb-2">
              Apa itu Dominansi Diagonal?
            </h4>
            <p className="text-blue-200 text-sm">
              Sebuah matriks <strong>dominan diagonal</strong> jika, di setiap
              baris, nilai absolut elemen diagonal lebih besar dari jumlah nilai
              absolut semua elemen lain di baris tersebut. Kondisi ini membantu
              memastikan bahwa metode Jacobi akan konvergen ke solusi yang
              benar.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Settings */}
      <Card className="bg-gray-800 border-gray-700">
        <Collapsible open={showSettings} onOpenChange={setShowSettings}>
          <CollapsibleTrigger asChild>
            <CardHeader className="cursor-pointer hover:bg-gray-700/50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Settings className="h-5 w-5 text-gray-400" />
                  <CardTitle className="text-white">
                    Pengaturan Lanjutan
                  </CardTitle>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-300 hover:text-white"
                >
                  {showSettings ? "Sembunyikan" : "Tampilkan"} Pengaturan
                </Button>
              </div>
              <CardDescription className="text-gray-400">
                Sesuaikan toleransi konvergensi dan iterasi maksimum
              </CardDescription>
            </CardHeader>
          </CollapsibleTrigger>

          <CollapsibleContent>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="tolerance" className="text-white">
                    Toleransi Konvergensi
                  </Label>
                  <Input
                    id="tolerance"
                    type="number"
                    step="any"
                    value={tolerance}
                    onChange={(e) =>
                      setTolerance(parseFloat(e.target.value) || 1e-6)
                    }
                    placeholder="1e-6"
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                  <p className="text-xs text-gray-400">
                    Metode berhenti ketika perubahan maksimum antar iterasi di
                    bawah nilai ini.
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="maxIterations" className="text-white">
                    Iterasi Maksimum
                  </Label>
                  <Input
                    id="maxIterations"
                    type="number"
                    value={maxIterations}
                    onChange={(e) =>
                      setMaxIterations(parseInt(e.target.value) || 100)
                    }
                    placeholder="100"
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                  <p className="text-xs text-gray-400">
                    Metode berhenti setelah jumlah iterasi ini bahkan jika belum
                    konvergen.
                  </p>
                </div>
              </div>
            </CardContent>
          </CollapsibleContent>
        </Collapsible>
      </Card>

      {/* Important Notes */}
      <Alert className="bg-gray-800 border-gray-700">
        <AlertTriangle className="h-4 w-4 text-yellow-400" />
        <AlertDescription className="text-gray-300">
          <strong className="text-white">Penting:</strong> Metode Jacobi bekerja
          paling baik dengan matriks dominan diagonal. Jika matriks Anda tidak
          dominan diagonal, metode mungkin tidak konvergen atau konvergen sangat
          lambat.
        </AlertDescription>
      </Alert>

      {/* Input Section */}
      <MatrixInput
        onSolve={handleSolve}
        title="Masukkan Sistem Persamaan Linear Anda"
        description="Masukkan koefisien dan konstanta untuk sistem Anda. Alat ini akan memeriksa dominansi diagonal dan menunjukkan setiap iterasi proses penyelesaian."
      />

      {/* Solution Display */}
      {solution && (
        <SolutionDisplay solution={solution} method="Metode Iterasi Jacobi" />
      )}

      {/* Educational Tips */}
      <Card className="bg-purple-900/10 border-purple-700 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-purple-400">Tips Pembelajaran</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-purple-300">
          <div className="space-y-2">
            <h4 className="font-semibold text-white">Memahami Konvergensi:</h4>
            <ul className="space-y-1 text-sm">
              <li>
                • <strong>Toleransi:</strong> Seberapa dekat iterasi
                berturut-turut harus berhenti
              </li>
              <li>
                • <strong>Dominansi Diagonal:</strong> Memastikan metode akan
                konvergen
              </li>
              <li>
                • <strong>Jumlah Iterasi:</strong> Semakin banyak iterasi =
                solusi semakin akurat
              </li>
            </ul>
          </div>

          <div className="space-y-2">
            <h4 className="font-semibold text-white">Mengamati Proses:</h4>
            <ul className="space-y-1 text-sm">
              <li>• Perhatikan bagaimana nilai berubah antar iterasi</li>
              <li>• Lihat bagaimana error berkurang seiring waktu</li>
              <li>• Amati efek dari tebakan awal yang berbeda</li>
            </ul>
          </div>

          <div className="space-y-2">
            <h4 className="font-semibold text-white">Pemecahan Masalah:</h4>
            <ul className="space-y-1 text-sm">
              <li>• Jika tidak konvergen, periksa dominansi diagonal</li>
              <li>• Coba susun ulang persamaan untuk meningkatkan dominansi</li>
              <li>• Tingkatkan iterasi maksimum untuk konvergensi lambat</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default JacobiPage;
