import { test, expect } from "@playwright/test";

test("نمایش سفارش‌ها و جست‌وجو", async ({ page }) => {
  await page.goto("http://127.0.0.1:3000");
  await expect(page.getByText("سفارش‌های اخیر")).toBeVisible();
  await expect(page.getByText("علی رضایی")).toBeVisible();
  await page.getByLabel("جست‌وجو").fill("نگار");
  await expect(page.getByText("نگار محمدی")).toBeVisible();
  await expect(page.getByText("علی رضایی")).not.toBeVisible();
});

test("فیلتر وضعیت", async ({ page }) => {
  await page.goto("http://127.0.0.1:3000");
  await page.getByLabel("فیلتر وضعیت").selectOption({ label: "لغوشده" });
  await expect(page.getByText("رضا اکبری")).toBeVisible();
  await expect(page.getByText("علی رضایی")).not.toBeVisible();
});