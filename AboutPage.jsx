// AboutPage.jsx
import { BookOpen, Calculator, Users, Heart } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.jsx";

function AboutPage() {
  return (
    <div className="space-y-8 text-gray-200">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <div className="bg-orange-900/30 p-3 rounded-full backdrop-blur-sm">
            <BookOpen className="h-8 w-8 text-orange-400" />
          </div>
        </div>
        <div>
          <h1 className="text-3xl font-bold text-white">Tentang Alat Ini</h1>
          <p className="text-lg text-gray-300 mt-2">
            Pelajari lebih lanjut tentang Penyelesaian Persamaan Linear dan
            metode yang diajarkannya
          </p>
        </div>
      </div>

      {/* Purpose */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-white">
            <Heart className="h-5 w-5 text-red-400" />
            <span>Misi Kami</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-gray-300">
          <p>
            Alat edukasi ini dibuat untuk membantu siswa dan pembelajar memahami
            proses langkah demi langkah dalam menyelesaikan sistem persamaan
            linear menggunakan dua metode numerik fundamental: Metode Matriks
            Balikan dan Metode Iterasi Jacobi.
          </p>
          <p>
            Daripada hanya memberikan jawaban, kami percaya pada pentingnya
            menunjukkan proses penyelesaian lengkap dengan penjelasan yang jelas
            di setiap langkah. Pendekatan ini membantu membangun pemahaman dan
            kepercayaan diri dalam aljabar linear numerik.
          </p>
        </CardContent>
      </Card>

      {/* Methods Overview */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-white">
              <Calculator className="h-5 w-5 text-green-400" />
              <span>Metode Matriks Balikan</span>
            </CardTitle>
            <CardDescription className="text-gray-400">
              Metode langsung untuk menyelesaikan sistem linear
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-gray-300">
            <div>
              <h4 className="font-semibold mb-2 text-white">Konsep Utama:</h4>
              <ul className="text-sm space-y-1">
                <li>• Representasi matriks dari sistem linear</li>
                <li>• Perhitungan determinan</li>
                <li>• Teknik inversi matriks</li>
                <li>• Perkalian matriks</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2 text-white">
                Paling Cocok Untuk:
              </h4>
              <ul className="text-sm space-y-1">
                <li>• Sistem kecil hingga menengah (2×2, 3×3)</li>
                <li>• Ketika solusi eksak dibutuhkan</li>
                <li>• Tujuan pendidikan</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-white">
              <Calculator className="h-5 w-5 text-purple-400" />
              <span>Metode Iterasi Jacobi</span>
            </CardTitle>
            <CardDescription className="text-gray-400">
              Metode iteratif untuk mengaproksimasi solusi
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-gray-300">
            <div>
              <h4 className="font-semibold mb-2 text-white">Konsep Utama:</h4>
              <ul className="text-sm space-y-1">
                <li>• Aproksimasi iteratif</li>
                <li>• Dominansi diagonal</li>
                <li>• Kriteria konvergensi</li>
                <li>• Analisis error</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2 text-white">
                Paling Cocok Untuk:
              </h4>
              <ul className="text-sm space-y-1">
                <li>• Sistem persamaan besar</li>
                <li>• Ketika solusi perkiraan dapat diterima</li>
                <li>• Memahami metode iteratif</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Educational Approach */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-white">
            <Users className="h-5 w-5 text-blue-400" />
            <span>Pendekatan Edukasi</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center space-y-2">
              <div className="bg-blue-900/30 p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto backdrop-blur-sm">
                <span className="text-blue-400 font-bold text-xl">1</span>
              </div>
              <h3 className="font-semibold text-white">Langkah-demi-Langkah</h3>
              <p className="text-sm text-gray-400">
                Setiap perhitungan dipecah menjadi langkah-langkah yang jelas
                dengan penjelasan rinci.
              </p>
            </div>

            <div className="text-center space-y-2">
              <div className="bg-green-900/30 p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto backdrop-blur-sm">
                <span className="text-green-400 font-bold text-xl">2</span>
              </div>
              <h3 className="font-semibold text-white">
                Pembelajaran Interaktif
              </h3>
              <p className="text-sm text-gray-400">
                Masukkan masalah Anda sendiri dan lihat bagaimana metode bekerja
                dengan sistem yang berbeda.
              </p>
            </div>

            <div className="text-center space-y-2">
              <div className="bg-purple-900/30 p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto backdrop-blur-sm">
                <span className="text-purple-400 font-bold text-xl">3</span>
              </div>
              <h3 className="font-semibold text-white">Pemahaman Visual</h3>
              <p className="text-sm text-gray-400">
                Representasi matriks dan perhitungan ditampilkan dengan jelas
                untuk meningkatkan pemahaman.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Technical Details */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Implementasi Teknis</CardTitle>
          <CardDescription className="text-gray-400">
            Cara kerja alat ini di balik layar
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 text-gray-300">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-2 text-white">
                Teknologi Frontend:
              </h4>
              <ul className="text-sm space-y-1">
                <li>• React untuk antarmuka pengguna interaktif</li>
                <li>• Tailwind CSS untuk desain responsif</li>
                <li>• Lucide React untuk ikon</li>
                <li>• Algoritma matematika kustom</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-2 text-white">
                Fitur Matematika:
              </h4>
              <ul className="text-sm space-y-1">
                <li>• Perhitungan determinan untuk matriks 2×2 dan 3×3</li>
                <li>• Inversi matriks menggunakan metode kofaktor</li>
                <li>• Iterasi Jacobi dengan pemeriksaan konvergensi</li>
                <li>• Validasi dominansi diagonal</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Learning Resources */}
      <Card className="bg-blue-900/10 border-blue-700 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-blue-400">Pembelajaran Lanjutan</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-blue-300">
          <div>
            <h4 className="font-semibold mb-2 text-white">
              Topik yang Direkomendasikan:
            </h4>
            <ul className="text-sm space-y-1">
              <li>• Metode iterasi Gauss-Seidel</li>
              <li>• Dekomposisi LU</li>
              <li>• Bilangan kondisi dan stabilitas matriks</li>
              <li>• Nilai eigen dan vektor eigen</li>
              <li>• Dekomposisi nilai singular (SVD)</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-2 text-white">
              Aplikasi di Dunia Nyata:
            </h4>
            <ul className="text-sm space-y-1">
              <li>• Simulasi teknik</li>
              <li>• Pemodelan ekonomi</li>
              <li>• Grafika komputer dan transformasi 3D</li>
              <li>• Algoritma pembelajaran mesin</li>
              <li>• Pengolahan sinyal</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Footer */}
      <div className="text-center py-8 text-gray-400">
        <p>
          Alat ini dirancang untuk tujuan pendidikan untuk membantu siswa
          memahami metode numerik untuk menyelesaikan sistem persamaan linear.
        </p>
        <p className="mt-2 text-sm">
          Dibuat dengan ❤️ untuk pembelajar di mana saja.
        </p>
      </div>
    </div>
  );
}

export default AboutPage;
