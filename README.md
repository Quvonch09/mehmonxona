# HotelPro — Mehmonxona Boshqaruvi va CRM Tizimi

Zamonaviy, tezkor va xavfsiz mehmonxona boshqaruv tizimi landing sahifasi.

## Loyihani Vercel'ga yuklash (Deploy qilish)

Loyihani Vercel platformasiga 2 xil qulay usulda yuklashingiz mumkin:

---

### 1-usul: Vercel CLI orqali (Terminaldan 1 daqiqada)

1. Ushbu loyiha papkasida terminalni oching (`PowerShell` yoki `CMD`):
   ```bash
   cd "c:\Users\Bobomurodov\Desktop\New folder"
   ```

2. Vercel buyrug'ini ishga tushiring:
   ```bash
   npx vercel
   ```

3. Terminaldagi savollarga quyidagicha javob bering:
   - **Set up and deploy?** -> `Y` (Enter)
   - **Which scope?** -> O'z hisobingizni tanlang (Enter)
   - **Link to existing project?** -> `N` (Enter)
   - **What's your project's name?** -> `hotelpro-crm` (yoki ixtiyoriy nom, Enter)
   - **In which directory is your code located?** -> `./` (Enter)

4. Sayt bir necha soniyada bepul `.vercel.app` domenida jonli ishga tushadi!
   Ishlab chiqarishga (Production) yuklash uchun:
   ```bash
   npx vercel --prod
   ```

---

### 2-usul: GitHub orqali (Eng tavsiya etiladigan usul)

1. Loyihani GitHub'ga yuklang:
   ```bash
   git init
   git add .
   git commit -m "HotelPro CRM Initial Commit"
   git branch -M main
   git remote add origin https://github.com/USERNAME/hotelpro-crm.git
   git push -u origin main
   ```

2. [vercel.com](https://vercel.com) saytiga kiring va GitHub profilingiz orqali kiring.
3. **"Add New..."** -> **"Project"** tugmasini bosing.
4. `hotelpro-crm` repozitoriyasini tanlab, **"Import"** tugmasini bosing.
5. Sozlamalarni o'zgartirmasdan **"Deploy"** tugmasini bosing.
6. Bir zumda sizga bepul HTTPS domen (masalan: `hotelpro-crm.vercel.app`) beriladi va har gal GitHub'ga kod qo'shganingizda sayt avtomatik yangilanib boradi.
