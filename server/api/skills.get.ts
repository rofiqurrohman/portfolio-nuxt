import { findSkills } from '../utils/portfolio-repository'
import { loadResource } from '../utils/load-resource'

export default defineEventHandler(() => loadResource('skills', findSkills))
