import { VideoAbuseModel } from '@server/models/abuse/video-abuse'
import { VideoCommentAbuseModel } from '@server/models/abuse/video-comment-abuse'
import { PickWith } from '@shared/core-utils'
import { AbuseModel } from '../../../models/abuse/abuse'
import { MAccountDefault, MAccountFormattable, MAccountLight, MAccountUrl } from '../account'
import { MCommentOwner, MCommentUrl, MVideoUrl, MCommentOwnerVideo } from '../video'
import { MVideo, MVideoAccountLightBlacklistAllFiles } from '../video/video'

type Use<K extends keyof AbuseModel, M> = PickWith<AbuseModel, K, M>
type UseVideoAbuse<K extends keyof VideoAbuseModel, M> = PickWith<VideoAbuseModel, K, M>
type UseCommentAbuse<K extends keyof VideoCommentAbuseModel, M> = PickWith<VideoCommentAbuseModel, K, M>

// ############################################################################

export type MAbuse = Omit<AbuseModel, 'VideoCommentAbuse' | 'VideoAbuse' | 'ReporterAccount' | 'FlaggedAccount' | 'toActivityPubObject'>

export type MVideoAbuse = Omit<VideoAbuseModel, 'Abuse' | 'Video'>

export type MCommentAbuse = Omit<VideoCommentAbuseModel, 'Abuse' | 'VideoComment'>

// ############################################################################

export type MVideoAbuseVideo =
  MVideoAbuse &
  UseVideoAbuse<'Video', MVideo>

export type MVideoAbuseVideoUrl =
  MVideoAbuse &
  UseVideoAbuse<'Video', MVideoUrl>

export type MVideoAbuseVideoFull =
  MVideoAbuse &
  UseVideoAbuse<'Video', MVideoAccountLightBlacklistAllFiles>

export type MVideoAbuseFormattable =
  MVideoAbuse &
  UseVideoAbuse<'Video', Pick<MVideoAccountLightBlacklistAllFiles,
  'id' | 'uuid' | 'name' | 'nsfw' | 'getMiniatureStaticPath' | 'isBlacklisted' | 'VideoChannel'>>

// ############################################################################

export type MCommentAbuseAccount =
  MCommentAbuse &
  UseCommentAbuse<'VideoComment', MCommentOwner>

export type MCommentAbuseAccountVideo =
  MCommentAbuse &
  UseCommentAbuse<'VideoComment', MCommentOwnerVideo>

export type MCommentAbuseUrl =
  MCommentAbuse &
  UseCommentAbuse<'VideoComment', MCommentUrl>

// ############################################################################

export type MAbuseId = Pick<AbuseModel, 'id'>

export type MAbuseVideo =
  MAbuse &
  Pick<AbuseModel, 'toActivityPubObject'> &
  Use<'VideoAbuse', MVideoAbuseVideo>

export type MAbuseUrl =
  MAbuse &
  Use<'VideoAbuse', MVideoAbuseVideoUrl> &
  Use<'VideoCommentAbuse', MCommentAbuseUrl>

export type MAbuseAccountVideo =
  MAbuse &
  Pick<AbuseModel, 'toActivityPubObject'> &
  Use<'VideoAbuse', MVideoAbuseVideoFull> &
  Use<'ReporterAccount', MAccountDefault>

export type MAbuseAP =
  MAbuse &
  Pick<AbuseModel, 'toActivityPubObject'> &
  Use<'ReporterAccount', MAccountUrl> &
  Use<'FlaggedAccount', MAccountUrl> &
  Use<'VideoAbuse', MVideoAbuseVideo> &
  Use<'VideoCommentAbuse', MCommentAbuseAccount>

export type MAbuseFull =
  MAbuse &
  Pick<AbuseModel, 'toActivityPubObject'> &
  Use<'ReporterAccount', MAccountLight> &
  Use<'FlaggedAccount', MAccountLight> &
  Use<'VideoAbuse', MVideoAbuseVideoFull> &
  Use<'VideoCommentAbuse', MCommentAbuseAccountVideo>

// ############################################################################

// Format for API or AP object

export type MAbuseFormattable =
  MAbuse &
  Use<'ReporterAccount', MAccountFormattable> &
  Use<'VideoAbuse', MVideoAbuseFormattable>
