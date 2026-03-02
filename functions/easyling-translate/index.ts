import { documentEventHandler } from '@sanity/functions'

const MODULE = '@easyling/sanity-auto-translate'

export const handler = documentEventHandler(async ({ context, event }) => {
  const { default: translateOnPublish } = await import(/* @vite-ignore */ MODULE)
  
  const time = new Date().toLocaleTimeString();
  console.log(`👋 Your Sanity Function was called at ${time}`);
  console.log('Ctx:', JSON.stringify(context, null, 2));
  console.log('Event:', JSON.stringify(event, null, 2));
  console.log('--------------------------------');

  const result = await translateOnPublish(event, context)

  if (result.skipped) {
    console.log(`Skipped: ${result.reason}`)
    return
  }

  if (!result.success) {
    console.error(`Translation failed: ${result.error}`)
    return
  }

  const { metrics, elapsedMs, summary } = result
  console.log(
    `Translation completed in ${elapsedMs}ms — ` +
    `${summary?.successCount}/${summary?.totalCount} succeeded, ` +
    `${summary?.failureCount} failed`
  )

  if (metrics.failedTranslations > 0) {
    console.warn('Error breakdown:', JSON.stringify(metrics.errorsByStage, null, 2))
  }
})