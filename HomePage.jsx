import { Link } from "react-router-dom";
import { Calculator, ArrowRight, BookOpen, Zap } from "lucide-react";
import { Button } from "@/components/ui/button.jsx";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.jsx";

function HomePage() {
  return (
    <div className="space-y-12 text-gray-200">
      {/* Hero Section */}
      <div className="text-center space-y-6">
        <div className="flex justify-center">
          <div className="bg-blue-900/30 p-4 rounded-full backdrop-blur-sm">
            <Calculator className="h-16 w-16 text-blue-400" />
          </div>
        </div>

        <div className="space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold text-white">
            Solusi Persamaan Linear
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
            Belajar menyelesaikan sistem persamaan linear langkah demi langkah
            menggunakan Metode Matriks Balikan dan Metode Iterasi Jacobi
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            asChild
            size="lg"
            className="text-lg px-8 py-3 bg-blue-600 hover:bg-blue-700"
          >
            <Link to="/inverse-matrix">
              Mulai dengan Matriks Balikan
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="text-lg px-8 py-3 text-white border-gray-500 hover:bg-gray-800"
          >
            <Link to="/jacobi">
              Coba Iterasi Jacobi
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>

      {/* Features Section */}
      <div className="grid md:grid-cols-2 gap-8">
        <Card className="bg-gray-800 border-gray-700 hover:border-blue-500 transition-colors">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <div className="bg-blue-900/30 p-2 rounded-lg backdrop-blur-sm">
                <Calculator className="h-6 w-6 text-blue-400" />
              </div>
              <CardTitle className="text-xl text-white">
                Metode Matriks Balikan
              </CardTitle>
            </div>
            <CardDescription className="text-gray-400">
              Selesaikan sistem persamaan linear menggunakan invers matriks.
              Cocok untuk sistem kecil hingga menengah.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h4 className="font-semibold text-white">
                Yang akan dipelajari:
              </h4>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>• Cara merepresentasikan persamaan dalam bentuk matriks</li>
                <li>• Menghitung determinan dan invers matriks</li>
                <li>• Proses penyelesaian langkah demi langkah</li>
                <li>• Kapan metode ini paling efektif</li>
              </ul>
            </div>
            <Button asChild className="w-full bg-blue-600 hover:bg-blue-700">
              <Link to="/inverse-matrix">
                Mulai Belajar
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700 hover:border-purple-500 transition-colors">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <div className="bg-purple-900/30 p-2 rounded-lg backdrop-blur-sm">
                <Zap className="h-6 w-6 text-purple-400" />
              </div>
              <CardTitle className="text-xl text-white">
                Metode Iterasi Jacobi
              </CardTitle>
            </div>
            <CardDescription className="text-gray-400">
              Pendekatan iteratif yang mengaproksimasi solusi melalui
              perhitungan berulang. Cocok untuk sistem besar.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h4 className="font-semibold text-white">
                Yang akan dipelajari:
              </h4>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>• Memahami metode iteratif</li>
                <li>• Dominansi diagonal dan konvergensi</li>
                <li>• Pembahasan tiap iterasi</li>
                <li>• Konsep toleransi dan akurasi</li>
              </ul>
            </div>
            <Button
              asChild
              className="w-full bg-purple-600 hover:bg-purple-700"
            >
              <Link to="/jacobi">
                Mulai Belajar
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Educational Approach Section */}
      <div className="bg-gray-800/50 rounded-lg p-8 border border-gray-700 backdrop-blur-sm">
        <div className="text-center space-y-6">
          <div className="flex justify-center">
            <div className="bg-orange-900/30 p-3 rounded-full backdrop-blur-sm">
              <BookOpen className="h-8 w-8 text-orange-400" />
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-white">
              Belajar dengan Praktek
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Pendekatan interaktif kami tidak hanya memberikan jawaban - tetapi
              menunjukkan setiap langkah proses penyelesaian dengan penjelasan
              yang jelas.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <div className="text-center space-y-2">
              <div className="bg-blue-900/30 w-12 h-12 rounded-full flex items-center justify-center mx-auto backdrop-blur-sm">
                <span className="text-blue-400 font-bold text-lg">1</span>
              </div>
              <h3 className="font-semibold text-white">Masukkan Sistem</h3>
              <p className="text-sm text-gray-400">
                Masukkan koefisien dan konstanta dari persamaan linear Anda
              </p>
            </div>

            <div className="text-center space-y-2">
              <div className="bg-green-900/30 w-12 h-12 rounded-full flex items-center justify-center mx-auto backdrop-blur-sm">
                <span className="text-green-400 font-bold text-lg">2</span>
              </div>
              <h3 className="font-semibold text-white">Ikuti Setiap Langkah</h3>
              <p className="text-sm text-gray-400">
                Lihat bagaimana kami memecah solusi menjadi langkah-langkah yang
                jelas
              </p>
            </div>

            <div className="text-center space-y-2">
              <div className="bg-purple-900/30 w-12 h-12 rounded-full flex items-center justify-center mx-auto backdrop-blur-sm">
                <span className="text-purple-400 font-bold text-lg">3</span>
              </div>
              <h3 className="font-semibold text-white">Pahami Alasannya</h3>
              <p className="text-sm text-gray-400">
                Pelajari alasan di balik setiap perhitungan dengan penjelasan
                rinci
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Start Section */}
      <div className="text-center space-y-6">
        <h2 className="text-2xl font-bold text-white">Siap Memulai?</h2>
        <p className="text-gray-400">
          Pilih metode di bawah ini dan mulai petualangan Anda dalam aljabar
          linear numerik.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            asChild
            size="lg"
            variant="outline"
            className="text-white border-gray-500 hover:bg-gray-800"
          >
            <Link to="/inverse-matrix">Metode Matriks Balikan</Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="text-white border-gray-500 hover:bg-gray-800"
          >
            <Link to="/jacobi">Metode Iterasi Jacobi</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
