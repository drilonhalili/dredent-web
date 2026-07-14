#!/usr/bin/env bash
# Downloads the real before/after patient photos into public/results/ with the
# filenames data/site-config.ts expects. Run once from the repo root:
#
#   bash scripts/fetch-results.sh
#
# ⚠️ These are signed Facebook CDN links that EXPIRE (the oe= parameter —
# roughly mid-August 2026). If a download fails with 403/410, re-share the
# photos and paste fresh links, or just save the originals straight into
# public/results/ using the same filenames.
set -euo pipefail

cd "$(dirname "$0")/.."
mkdir -p public/results

fetch() {
  local name="$1" url="$2"
  if [ -s "public/results/$name" ]; then
    echo "✓ $name already exists, skipping"
    return
  fi
  echo "→ $name"
  curl -fsSL -o "public/results/$name" "$url"
}

# Case 01 — retracted full-mouth view, male patient
fetch case-01-before.jpg 'https://scontent.fskp4-1.fna.fbcdn.net/v/t1.15752-9/744816027_1261767509241541_8203037996050822762_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=fc17b8&_nc_ohc=Ff14dOmXp6sQ7kNvwEg3XPu&_nc_oc=AdpzGalgEV95-Bys_EeusIxcHbDMD1jb9Wi6qssoh4qTmwql9lSHxi4cV4uSjd5LY7c&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent.fskp4-1.fna&_nc_ss=7a22e&oh=03_Q7cD5wGUS2aCgowBmzvCavNdBLJj33HsMvk-1YwmLGQmlqsAFA&oe=6A7C3E80'
fetch case-01-after.jpg 'https://scontent.fskp4-1.fna.fbcdn.net/v/t1.15752-9/743699254_1376084284585775_3792211296883684965_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=fc17b8&_nc_ohc=NAsaYqizqjYQ7kNvwE-Gqgd&_nc_oc=AdrQQBXDzqhckuKYnuwOHSKabmJ73bAV9-68JEt2mQQ7FjK2iAkNxLPxuwaRYf0R4rA&_nc_zt=23&_nc_ht=scontent.fskp4-1.fna&_nc_ss=7b6a8&oh=03_Q7cD5wEI76N3Gwm6UNN14XyqQo1fPpx7A6WYH3-NWHsyfd6KQQ&oe=6A7C3FD2'

# Case 02 — gaps closed at a natural shade (before = gappy/discolored, after = angled close-up)
fetch case-02-before.jpg 'https://scontent.fskp4-2.fna.fbcdn.net/v/t1.15752-9/746256090_2091599751438534_2749682331382970744_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=fc17b8&_nc_ohc=f49W4Rex9J8Q7kNvwEucwar&_nc_oc=AdpRNiNSGIbh_RCMd6Jehh67OR42XlYpL7daI_7GKlzZPB3LnpK2VuGVUFFIAkcCJPU&_nc_zt=23&_nc_ht=scontent.fskp4-2.fna&_nc_ss=7b6a8&oh=03_Q7cD5wEI-L1f5BFrHdZr9kOvxjg2cToPlfL0QgqPdo2Q-Sp2FQ&oe=6A7C52D0'
fetch case-02-after.jpg 'https://scontent.fskp4-1.fna.fbcdn.net/v/t1.15752-9/744778769_4124340297873479_6023084979184799030_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=fc17b8&_nc_ohc=eT7yVzx6IFAQ7kNvwHmal_k&_nc_oc=Ado6iaOj665_tqFxd8qm4T_ozFvF0OqGTaY6fjP7t9pk4rQzWEs6mRMl39QcGGx7DFw&_nc_zt=23&_nc_ht=scontent.fskp4-1.fna&_nc_ss=7b6a8&oh=03_Q7cD5wG_LsK1ckeO-dhUGTQXxs452sWsmeArxsxjN-uQ_D_ysA&oe=6A7C4146'

# Case 03 — social smile view, female patient (before = damaged front teeth, after = lipstick smile)
fetch case-03-before.jpg 'https://scontent.fskp4-2.fna.fbcdn.net/v/t1.15752-9/746067322_1394072952619520_6969128979087407659_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=fc17b8&_nc_ohc=iFPvpkLkP8UQ7kNvwH3uCWG&_nc_oc=AdqECAm_HkOFxhYveciMMGx0WxIumZ-N8FJ5AmtqGAByCNf7x0d7Fmxh5MCWZfNYh0s&_nc_zt=23&_nc_ht=scontent.fskp4-2.fna&_nc_ss=7b6a8&oh=03_Q7cD5wEABeOhSo3ivAWE0DqbyIKgfzAnpXxtcdY8350CwOPhiQ&oe=6A7C4977'
fetch case-03-after.jpg 'https://scontent.fskp4-1.fna.fbcdn.net/v/t1.15752-9/746164032_1051349787405467_1204558611231444836_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=fc17b8&_nc_ohc=ueNFa3TbbvMQ7kNvwF-JSW6&_nc_oc=AdqBp7Q6TkPVrt09sc9tR7ytvL_fVh8Qd_x3FRZ7xmt22snyadFcx5qq15HUSwmMvKs&_nc_zt=23&_nc_ht=scontent.fskp4-1.fna&_nc_ss=7b6a8&oh=03_Q7cD5wErktUAxhwBK2Wc-hs-7G1J1L7zldlhLlCAH9N_kC4FNg&oe=6A7C5851'

# Case 04 — retracted close-up (before = stained/receded, after = brightened ceramic; both 1640×1094)
fetch case-04-before.jpg 'https://scontent.fskp4-1.fna.fbcdn.net/v/t1.15752-9/744355490_2778636305855923_6082815577682807722_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=fc17b8&_nc_ohc=PejR25WDiRsQ7kNvwEwb7Pz&_nc_oc=AdpmAuBCnfsoQ7GWcC7fRw-96himR6cmylCvefxOskyVfBeFoZFeaaIUe9p1_pe34bI&_nc_zt=23&_nc_ht=scontent.fskp4-1.fna&_nc_ss=7b6a8&oh=03_Q7cD5wFd7tasfEACUjIE10XSlf0zo63QyX3E806CScN6AKc2Dw&oe=6A7C73F8'
fetch case-04-after.jpg 'https://scontent.fskp4-2.fna.fbcdn.net/v/t1.15752-9/744087744_1847864589520801_734187379367349041_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=fc17b8&_nc_ohc=qT3gicVaGF0Q7kNvwH99y7s&_nc_oc=AdqvIokfX_caCV1R76SO37tmqssIAGD1Dcp0JGdolfY8t2qFzT1Oj8C6rJ-asFJsAdU&_nc_zt=23&_nc_ht=scontent.fskp4-2.fna&_nc_ss=7b6a8&oh=03_Q7cD5wGpGwKhTxzHaDPUqVC_1ee4LZkt4TjvC5h60at4f0aKIw&oe=6A7C6B46'

# Case 05 — upper arch with contrast board (before = worn/uneven, after = full ceramic)
fetch case-05-before.jpg 'https://scontent.fskp4-1.fna.fbcdn.net/v/t1.15752-9/742838111_1892361291432721_5089892363480380233_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=fc17b8&_nc_ohc=QXp-DH4Kl9EQ7kNvwGHlvaB&_nc_oc=Adr9I8_IxphxCpPRg9NvG1Z3zeBq_D0Zi4hNvAQNJKZSWk5B7mE_XLqVG7WHQMFIFu0&_nc_zt=23&_nc_ht=scontent.fskp4-1.fna&_nc_ss=7b6a8&oh=03_Q7cD5wEzNaKfqrfwpcz0tNKNysjJrtOIAl2NoNIQfyVLhduuLg&oe=6A7C7642'
fetch case-05-after.jpg 'https://scontent.fskp4-1.fna.fbcdn.net/v/t1.15752-9/746502923_1356662346413093_9075428447018125786_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=fc17b8&_nc_ohc=1tqORDHI7QkQ7kNvwFJIZHp&_nc_oc=AdruocFayhMZqMNMnhJ9CHS9okrnWcbbRKJYKf15RsAnHDkGawdY8inLPrL1g2powoY&_nc_zt=23&_nc_ht=scontent.fskp4-1.fna&_nc_ss=7b6a8&oh=03_Q7cD5wHlxYvDw5t5z7bPBZipQHRd07IxkH-oLEnpnkVHIYmWQw&oe=6A7C4DAE'

echo
echo "Done. Files in public/results/:"
ls -la public/results/
echo
echo "Now rebuild the site (npm run build) and the sliders will use the real photos."
