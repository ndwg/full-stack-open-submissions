const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, createBlog } = require('./helper')

describe('Blog app', () => {
    beforeEach(async ({ page, request }) => {
        await request.post('http://localhost:3003/api/testing/reset')
        await request.post('http://localhost:3003/api/users', {
            data: {
                name: 'Matti Luukkainen',
                username: 'mluukkai',
                password: 'salainen'
            }
        })
        await request.post('http://localhost:3003/api/users', {
            data: {
                name: 'Tester',
                username: 'test',
                password: 'test'
            }
        })

        await page.goto('http://localhost:5173')
    })
  
    test('Login form is shown', async ({ page }) => {
        const username = await page.getByTestId('username')
        await expect(username).toBeVisible()
    })
  
    describe('Login', () => {
      test('succeeds with correct credentials', async ({ page }) => {
        await loginWith(page, 'mluukkai', 'salainen')
    
        await expect(page.getByText('Matti Luukkainen logged in')).toBeVisible()
      })
  
      test('fails with wrong credentials', async ({ page }) => {
        await loginWith(page, 'wrong', 'nope')

        const errorDiv = await page.locator('.error')
        await expect(errorDiv).toContainText('Wrong credentials')
        await expect(page.getByText('Matti Luukkainen logged in')).not.toBeVisible()
      })

      describe('When logged in', () => {
        beforeEach(async ({ page }) => {
            await loginWith(page, 'mluukkai', 'salainen')
        })
      
        test('a new blog can be created', async ({ page }) => {
            await createBlog(page, 'a blog created by playwright', 'John Test', 'test.test')
            await expect(page.getByText('a blog created by playwright')).toBeVisible()
        })
        })
      
      describe('After posting', () => {
        beforeEach(async ({ page }) => {
            await loginWith(page, 'mluukkai', 'salainen')
            await createBlog(page, 'a blog created by playwright', 'John Test', 'test.test')
        })

        test('a blog can be liked', async ({ page }) => {
            await page.getByRole('button', { name: 'view' }).click()
            await page.getByRole('button', { name: 'like' }).click()

            await expect(page.getByText('1')).toBeVisible()
        })

        test('a blog can be deleted', async ({ page }) => {
            page.goto("http://localhost:5173")
            await page.getByRole('button', { name: 'view' }).click()
            await page.on('dialog', dialog => dialog.accept())
            await page.getByRole('button', { name: 'remove' }).click()
            page.goto("http://localhost:5173")

            await expect(page.getByText('a blog created by playwright')).not.toBeVisible()
        })

        test('a blogs delete button does not show up for others', async ({ page }) => {
            await page.getByRole('button', { name: 'logout' }).click()
            page.goto("http://localhost:5173")
            await loginWith(page, 'test', 'test')

            await page.getByRole('button', { name: 'view' }).click()

            await expect(page.getByRole('button', { name: 'remove' })).not.toBeVisible()
        })

        test('blogs are sorted by likes', async ({ page }) => {
            await page.goto("http://localhost:5173")
            await createBlog(page, 'another blog created by playwright', 'John Test', 'test.test')
            await page.goto("http://localhost:5173")
            await page.getByRole('button', { name: 'view' }).nth(1).click()
            await page.getByRole('button', { name: 'like' }).click()
            await page.goto("http://localhost:5173")

            await expect(page.getByTestId('blogListing').nth(0)).toContainText('another blog created by playwright')
        })

      })
    })
})