CREATE TABLE HOCSINH (
	MaHS smallint identity(1000,1) unique not null,
	HoTen nvarchar(30),
	DiaChi nvarchar(200),
	NamSinh date,
	GioiTinh nvarchar(3) check (GioiTinh = 'Nam' or GioiTinh = 'Nữ'),
	Email varchar(30)
)
alter table HOCSINH add constraint Hs_PK primary key (MaHS)

CREATE TABLE HOCKY (
	MaHK smallint not null,
	HocKy tinyint check (HocKy = 1 or HocKy = 2),
	NamHoc smallint check (NamHoc > 1900)
)
alter table HOCKY add constraint Hk_PK primary key (MaHK)

CREATE TABLE GIAOVIEN (
	MaGV tinyint identity(10, 1) unique not null,
	HoTen nvarchar(30),
	DiaChi nvarchar(200),
	NamSinh date,
	GioiTinh nvarchar(3) check (GioiTinh = 'Nam' or GioiTinh = 'Nữ'),
	Email varchar(30),
	NgayNhanViec date
)
alter table GIAOVIEN add constraint Gv_PK primary key (MaGV)

CREATE TABLE KHOILOP (
	MaKhoi tinyint identity(1,1) unique not null,
	Khoi char(2) check (Khoi = '10' or Khoi = '11' or Khoi = '12')
)
alter table KHOILOP add constraint Kl_PK primary key (MaKhoi)

CREATE TABLE LOP (
	MaLop smallint identity(1,1) unique not null,
	TenLop varchar(4),
	MaKhoi tinyint,
	SiSo tinyint
)
alter table LOP add constraint LOP_PK primary key (MaLop)

CREATE TABLE QUATRINHHOC (
	MaQTH smallint unique not null,
	MaHS smallint,
	MaLop smallint,
	MaHK smallint,
	MaGV tinyint,
	DiemTBHK float check(DiemTBHK >= 0 and DiemTBHK <= 10)
)
alter table QUATRINHHOC add constraint Qth_PK primary key (MaQTH)

CREATE TABLE LOAIKIEMTRA (
	MaLKT tinyint identity(1,1) unique not null,
	TenLKT nvarchar(20),
	HeSo tinyint
)
alter table LOAIKIEMTRA add constraint Lkt_PK primary key (MaLKT)

CREATE TABLE MONHOC (
	MaMon smallint identity(1,1) unique not null,
	TenMon nvarchar(20),
	HeSo tinyint,
	MaGV smallint
)
alter table MONHOC add constraint Mh_PK primary key (MaMon)

CREATE TABLE BANGDIEMMON (
	MaBDM int identity(1,1) unique not null,
	MaQTH smallint unique not null,
	MaMon smallint,
	MaGV tinyint,
	DiemTBMon float check(DiemTBMon >= 0 and DiemTBMon <= 10)
)
alter table BANGDIEMMON add constraint Bdm_PK primary key (MaBDM)

CREATE TABLE CT_BANGDIEMMON (
	MaCT_BDM int identity(1,1) unique not null,
	MaBDM int,
	MaLKT tinyint,
	Diem float check(Diem >= 0 and Diem <= 10)
)
alter table CT_BANGDIEMMON add constraint Ctbdm_PK primary key (MaCT_BDM)

CREATE TABLE BAOCAOTONGKETMON (
	MaBCTKM int identity(1,1) unique not null,
	MaMon smallint,
	MaHK smallint
)
alter table BAOCAOTONGKETMON add constraint Bctkm_PK primary key (MaBCTKM)

CREATE TABLE CT_BAOCAOTONGKETMON (
	MaBCTKM int unique not null,
	MaLop smallint not null,
	SoLuongDat smallint,
	TiLe decimal(2,1) check (TiLe >= 0 and TiLe <= 100)
)
alter table CT_BAOCAOTONGKETMON add constraint Ctbctkm_PK primary key (MaBCTKM, MaLop)

CREATE TABLE BAOCAOTONGKETHOCKY (
	MaHK smallint not null,
	MaLop smallint not null,
	SoLuongDat smallint,
	TiLe decimal(2,1) check (TiLe >= 0 and TiLe <= 100)
)
alter table BAOCAOTONGKETHOCKY add constraint Bctkhk_PK primary key (MaHK, MaLop)

alter table LOP add constraint Lop_FK_makl foreign key (MaKhoi) references KHOILOP (MaKhoi)

alter table QUATRINHHOC add constraint Qth_FK_mahs foreign key (MaHS) references HOCSINH (MaHS)
alter table QUATRINHHOC add constraint Qth_FK_malop foreign key (MaLop) references LOP (MaLop)
alter table QUATRINHHOC add constraint Qth_FK_mahk foreign key (MaHK) references HOCKY (MaHK)
alter table QUATRINHHOC add constraint Qth_FK_magv foreign key (MaGV) references GIAOVIEN (MaGV)

alter table BANGDIEMMON add constraint Bdm_FK_magv foreign key (MaGV) references GIAOVIEN (MaGV)
alter table BANGDIEMMON add constraint Bdm_FK_maqth foreign key (MaQTH) references QUATRINHHOC (MaQTH)
alter table BANGDIEMMON add constraint Bdm_FK_mamon foreign key (MaMon) references MONHOC (MaMon)

alter table CT_BANGDIEMMON add constraint Ctbdm_FK_mabdm foreign key (MaBDM) references BANGDIEMMON (MaBDM)
alter table CT_BANGDIEMMON add constraint Ctbdm_FK_malkt foreign key (MaLKT) references LOAIKIEMTRA (MaLKT)

alter table BAOCAOTONGKETMON add constraint Bctkm_FK_mamh foreign key (MaMon) references MONHOC (MaMon)
alter table BAOCAOTONGKETMON add constraint Bctkm_FK_mahk foreign key (MaHK) references HOCKY(MaHK)

alter table CT_BAOCAOTONGKETMON add constraint Ctbctkm_FK_malop foreign key (MaLop) references LOP (MaLop)

alter table BAOCAOTONGKETHOCKY add constraint bctkhk_FK_malop foreign key (MaLop) references LOP (MaLop)
alter table BAOCAOTONGKETHOCKY add constraint bctkhk_FK_mahk foreign key (MaHK) references HOCKY (MaHK)

alter table MONHOC add DiemDat float check(DiemDat >= 0 and DiemDat <= 10)