import { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { FavoritesProvider } from '@/hooks/useFavorites'
import { Layout } from '@/components/layout/Layout'
import { PageSkeleton, PropertyDetailSkeleton } from '@/components/ui/PageSkeletons'

const Home = lazy(() => import('@/pages/Home'))
const Properties = lazy(() => import('@/pages/Properties'))
const PropertyDetail = lazy(() => import('@/pages/PropertyDetail'))
const Favorites = lazy(() => import('@/pages/Favorites'))
const About = lazy(() => import('@/pages/About'))
const Financing = lazy(() => import('@/pages/Financing'))
const Sell = lazy(() => import('@/pages/Sell'))
const Contact = lazy(() => import('@/pages/Contact'))
const NotFound = lazy(() => import('@/pages/NotFound'))

export default function App() {
  return (
    <FavoritesProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route
              index
              element={
                <Suspense fallback={<PageSkeleton />}>
                  <Home />
                </Suspense>
              }
            />
            <Route
              path="imoveis"
              element={
                <Suspense fallback={<PageSkeleton />}>
                  <Properties />
                </Suspense>
              }
            />
            <Route
              path="imoveis/:slug"
              element={
                <Suspense fallback={<PropertyDetailSkeleton />}>
                  <PropertyDetail />
                </Suspense>
              }
            />
            <Route
              path="favoritos"
              element={
                <Suspense fallback={<PageSkeleton />}>
                  <Favorites />
                </Suspense>
              }
            />
            <Route
              path="sobre"
              element={
                <Suspense fallback={<PageSkeleton />}>
                  <About />
                </Suspense>
              }
            />
            <Route
              path="financiamento"
              element={
                <Suspense fallback={<PageSkeleton />}>
                  <Financing />
                </Suspense>
              }
            />
            <Route
              path="anuncie"
              element={
                <Suspense fallback={<PageSkeleton />}>
                  <Sell />
                </Suspense>
              }
            />
            <Route
              path="contato"
              element={
                <Suspense fallback={<PageSkeleton />}>
                  <Contact />
                </Suspense>
              }
            />
            <Route
              path="*"
              element={
                <Suspense fallback={<PageSkeleton />}>
                  <NotFound />
                </Suspense>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </FavoritesProvider>
  )
}
