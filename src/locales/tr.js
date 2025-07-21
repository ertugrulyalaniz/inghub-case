export default {
	app: {
		title: "Çalışan Yönetimi",
	},

	nav: {
		home: "Ana Sayfa",
		employees: "Çalışanlar",
		addEmployee: "Çalışan Ekle",
		language: "Dil",
		toggleMenu: "Menüyü aç/kapat",
		userMenu: "Kullanıcı menüsü",
		statistics: "İstatistikler",
	},

	common: {
		save: "Kaydet",
		cancel: "İptal",
		edit: "Düzenle",
		delete: "Sil",
		actions: "İşlemler",
		loading: "Yükleniyor...",
		noData: "Veri bulunamadı",
		confirm: "Onayla",
		close: "Kapat",
		view: "Görüntüle",
		add: "Ekle",
		update: "Güncelle",
		ok: "Tamam",
		selectOption: "Lütfen Seçin",
		backToList: "Listeye Dön",
	},

	employee: {
		firstName: "Ad",
		lastName: "Soyad",
		email: "E-posta",
		phone: "Telefon",
		dateOfBirth: "Doğum Tarihi",
		dateOfEmployment: "İşe Başlama Tarihi",
		department: "Departman",
		position: "Pozisyon",
		employeeList: "Çalışan Listesi",
		addEmployee: "Çalışan Ekle",
		editEmployee: "Çalışan Düzenle",
		employeeDetails: "Çalışan Detayları",
		totalEmployees: "Toplam Çalışan",
	},

	departments: {
		analytics: "Analitik",
		tech: "Teknoloji",
	},

	positions: {
		junior: "Uzman Yardımcısı",
		medior: "Uzman",
		senior: "Kıdemli Uzman",
	},

	viewModes: {
		table: "Tablo Görünümü",
		list: "Liste Görünümü",
	},

	pagination: {
		page: "Sayfa",
		of: "/",
		items: "kayıt",
		itemsPerPage: "Sayfa başına kayıt",
		showing: "Gösterilen",
		to: "-",
		previous: "Önceki",
		next: "Sonraki",
		first: "İlk",
		last: "Son",
		noItems: "Kayıt bulunamadı",
	},

	validation: {
		required: "Bu alan zorunludur",
		invalidEmail: "Geçerli bir e-posta adresi giriniz",
		invalidPhone: "Geçerli bir telefon numarası giriniz",
		invalidDate: "Geçerli bir tarih giriniz",
		minLength: "En az {min} karakter girilmelidir",
		maxLength: "En fazla {max} karakter girilebilir",
		emailExists: "Bu e-posta adresi ile kayıtlı bir çalışan bulunmaktadır",
		futureDate: "Gelecek tarih seçilemez",
		employmentBeforeBirth: "İşe başlama tarihi doğum tarihinden önce olamaz",
	},

	confirmations: {
		deleteEmployee: {
			title: "Çalışan Sil",
			message:
				"{name} adlı çalışanı silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.",
			confirm: "Sil",
			cancel: "İptal",
		},
		updateEmployee: {
			title: "Çalışan Güncelle",
			message: "Çalışan bilgilerini güncellemek istediğinizden emin misiniz?",
			confirm: "Güncelle",
			cancel: "İptal",
		},
		unsavedChanges: {
			title: "Kaydedilmemiş Değişiklikler",
			message:
				"Kaydedilmemiş değişiklikleriniz var. Çıkmak istediğinizden emin misiniz?",
			confirm: "Çık",
			cancel: "Kal",
		},
	},

	success: {
		employeeAdded: "Çalışan başarıyla eklendi",
		employeeAddedMessage: "Yeni çalışan sisteme eklendi.",
		employeeUpdated: "Çalışan başarıyla güncellendi",
		employeeDeleted: "Çalışan başarıyla silindi",
	},

	errors: {
		loadingEmployees: "Çalışanlar yüklenirken hata oluştu",
		savingEmployee: "Çalışan kaydedilirken hata oluştu",
		deletingEmployee: "Çalışan silinirken hata oluştu",
		employeeNotFound: "Çalışan bulunamadı",
		employeeNotFoundMessage:
			"Aradığınız çalışan bulunamadı veya silinmiş olabilir.",
		genericError: "Bir hata oluştu. Lütfen tekrar deneyin.",
	},

	emptyStates: {
		noEmployees: "Çalışan bulunamadı",
		addFirstEmployee: "İlk çalışanınızı ekleyerek başlayın",
	},

	tooltips: {
		editEmployee: "Çalışanı düzenle",
		deleteEmployee: "Çalışanı sil",
		viewDetails: "Çalışan detaylarını görüntüle",
		switchToTable: "Tablo görünümüne geç",
		switchToList: "Liste görünümüne geç",
	},

	stats: {
		totalEmployees: "Toplam Çalışan",
		departments: "Departmanlar",
		averageAge: "Ortalama Yaş",
	},
};
